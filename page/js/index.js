let everydayVm = new Vue({
    el: '#everyday',
    data: {
        everydayContentCn: 'Years may wrinkle the skin, but to give up enthusiasm wrinkles the soul.',
        everydayContentEn: '岁月留痕，只及肌肤；激情不再，皱起心灵。',
        person: 'Samuel Ullman'
    },
    created () {
        axios.get('/queryEveryday').then( data => {
            if (data.data.msg === '成功') {
                let values = data.data.data[0].content.replace(/；/g ,';').split(';')
                this.everydayContentCn = values[0]
                this.everydayContentEn = values[1]
                this.person = values[2]
            } else {
                throw new Error('请求失败')
            }
        })
    }
})
let articleVm = new Vue({
    el: '#article',
    data: {
        page: 1,
        pageSize: 5,
        count: 20,
        article: [
            {
                articleTitle: '四联杀幽门螺杆菌第三天',
                articleContent: `前段时间总是干呕嗳气，吃饭很容易饱，饭后恶心想吐，
                                喝咖啡后更剧烈。首次医院门诊，医生说是可能是胃动力不足消化不良，给开了点儿中成药，
                                没要。问医生是否可以做一下钡餐或胃镜检查一下，于是预约了第二天的胃镜。第一次做胃镜，
                                很顺利。胃镜报告显示胃角C2慢性萎缩性胃炎。几天后活检的病理结果显示慢性萎缩性胃炎
                                ，中度萎缩，中度炎症，中度活动，中度肠上皮化生，HP++……好...`,
                ctime: '2018-10-30',
                view: 20,
                    tags: ['幽门螺杆菌', '萎缩性胃炎']
            }
        ]
    },
    methods: {
        getPageList () {
            let params = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
            let tid = params ? (params[0].split('=')[0] === 'tid' ? params[0].split('=')[1] : '') : ''

            if (tid) {
                let url = `/queryMappingByTag?page=${this.page - 1}&pageSize=${this.pageSize}&tid=${tid}`
                axios.get(url).then(data => {
                    if (data.data.msg === '成功') {
                        let values = data.data.data
                        let arr = []
                        values.forEach(item => {
                            let temp = {}
                            temp.articleTitle = item.title
                            temp.articleContent = item.content.replace(/<[^>]+>/g, '').substring(0, 235)+ '...'
                            temp.tags = item.tags.split(',')
                            temp.view = item.views
                            temp.ctime = moment(item.ctime).format().split('T')[0]
                            temp.link = `blog_detail.html?bid=${item.id}`
                            arr.push(temp)
                        })
                        this.getCount(`/queryCountByTag?tid=${tid}`)
                        this.article = arr
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else {
                let url = `/queryArt?page=${this.page - 1}&pageSize=${this.pageSize}`
                axios.get(url).then(data => {
                    if (data.data.msg === '成功') {
                        let values = data.data.data
                        let arr = []
                        values.forEach(item => {
                            let temp = {}
                            temp.articleTitle = item.title
                            temp.articleContent = item.content.replace(/<[^>]+>/g, '').substring(0, 235)+ '...'
                            temp.tags = item.tags.split(',')
                            temp.view = item.views
                            temp.ctime = moment(item.ctime).format().split('T')[0]
                            temp.link = `blog_detail.html?bid=${item.id}`
                            arr.push(temp)
                        })
                        this.getCount('/queryCount')
                        this.article = arr
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        getPage (item) {
            console.log(item)
            this.page = item
            this.getPageList()
            document.getElementsByTagName('html')[0].scrollTop=0
        },
        getCount (url) {
            axios.get(url).then(data => {
                if (data.data.msg === '成功') {
                    this.count = data.data.data[0].count
                }
            })
        }
    },
    computed: {
        pageBtn () {
            let arr = [],
                page = this.page,
                pageSize = this.pageSize,
                count = this.count
            arr.push({text: '<<', page: 1})
            if (page > 2) {
                arr.push({text: page - 2, page: page - 2})
            }
            if (page > 1) {
                arr.push({text: page - 1, page: page - 1})
            }
            arr.push({text: page, page: page})
            if (page + 1 <= (count + pageSize - 1) / pageSize) {
                arr.push({text: page + 1, page: page + 1})
            }
            if (page + 2 <= (count + pageSize - 1) / pageSize) {
                arr.push({text: page + 2, page: page + 2})
            }
            arr.push({text: '>>', page: parseInt((count + pageSize - 1) / pageSize)})
            return arr
        }
    },
    created () {
        this.getPageList()
    }
})

