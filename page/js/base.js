let rightBox = new Vue({
    el: '#right',
    data: {
        tags: [],
        nowHots: [],
        newComments: [],
        hots: []
    },
    computed: {
    },
    methods: {
        tagStyle () {
            let num = () => {
                return parseInt(Math.random()*255)
            }
            let color = `color:rgb(${num()},${num()},${num()})`

            let str = parseInt(Math.random()*20 + 8)
            let size = `font-size: ${str}px`
            return `${color};${size}`
        },
        queryTag () {
            axios.get('/getTagPage').then(data => {
                if (data.data.status === 'success') {
                    let arr = []
                    data.data.data.forEach(item => {
                        let obj = {}
                        obj.tag = item.tag
                        obj.id = item.id
                        obj.link = `index.html?tid=${item.id}`
                        arr.push(obj)
                    })
                    this.tags = arr
                }
            }).catch(err => {
                console.log(err)
            })
        },
        queryNowHots () {
            let url = '/queryNowHots'
            axios.get(url).then(data => {
                if (data.data.status === 'success') {
                    let values = data.data.data
                    let arr = []
                    values.forEach(item => {
                        let temp = {}
                        temp.hotTitle = item.title
                        temp.link = `blog_detail.html?bid=${item.id}`
                        arr.push(temp)
                    })
                    this.hots = arr
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getComLink (bid) {
            if (bid === -10) {
                return 'about.html'
            } else if (bid === -5) {
                return 'commentBook.html'
            } else {
                return `blog_detail.html?bid=${bid}`
            }
        },
        queryNewComments () {
            let url = '/queryNewCom'
            axios.get(url).then(data => {
                if (data.data.status === 'success') {
                    let result = data.data.data
                    let arr =[]
                    result.forEach(item => {
                        let temp = {}
                        temp.use = item['user_name']
                        temp.ctime = (moment.duration(Date.now() - item['ctime']).asMinutes() < 60) ? moment.duration(Date.now() - item['ctime']).asMinutes() + '分钟前' : ((moment.duration(Date.now() - item['ctime']).asHours() < 24) ? moment.duration(Date.now() - item['ctime']).asHours() + '小时前' : moment.duration(Date.now() - item['ctime']).days() + '天前')
                        temp.content = item['comments'].substring(0, 20) + '...'
                        temp.link = this.getComLink(item['blog_id'])
                        arr.push(temp)
                    })
                    this.newComments = arr
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        this.queryTag ()
        this.queryNowHots()
        this.queryNewComments()
    }
})

let searchBar = new Vue ({
    el: '#search',
    data: {
        timer: null,
        values: ''
    },
    methods: {
        queryBlog (val) {
            if (val) {
                let url = `/queryBlogByKeyword?K=${val}`
                axios(url).then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        search (fun, time) {
            clearTimeout(this.timer)
            this.timer = setTimeout( () =>{
                fun(this.values)
            }, time)
        }
    }
})