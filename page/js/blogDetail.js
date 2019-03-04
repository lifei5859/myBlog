let blogDetail = new Vue({
    el: '#article-detail',
    data: {
        article: {},
        use: '',
        email: '',
        commentContent: '',
        commentCode: '',
        error: '',
        replyUse: '',
        codeObj: '',
        page: 1,
        commentList: [],
        count: 0,
        pageSize: 10
    },
    methods: {
        getBlog () {
            let bid = window.location.search
            axios.get(`/queryArtById${bid}`).then(data => {
                console.log(data)
                if (data.data.msg === '成功') {
                    let temp = data.data.data[0]
                    let obj = {}
                    for (let prop in temp) {
                        if (prop === 'ctime') {
                            obj[prop] = moment(temp[prop]).format('YYYY-MM-DD h:mm')
                        } else if (prop === 'tags') {
                            obj[prop] = temp[prop].split(',')
                        } else {
                            obj[prop] = temp[prop]
                        }
                    }
                    this.article = obj
                    if (this.article.id){
                        this.getCount()
                        this.getComments()
                    }

                }
            }).catch(err => {
                console.log(err)
            })
        },
        verification () {
            let emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/ ,
                use = this.use,
                com = this.commentContent
                if ( use.length === 0 ) {
                    this.error = 'useNull'
                    return
                } else if (use.length > 12) {
                    this.error = 'useError'
                    return
                } else if ( !emailReg.test(this.email) ) {
                    this.error = 'emailError'
                    return
                } else if (com.length < 8) {
                    this.error = 'comError'
                    return
                } else if (this.codeObj.text.toLowerCase() !== this.commentCode.toLowerCase()) {
                    this.error = 'codeError'
                    return
                }

                return true
        },
        queryComCode () {
            axios.get('/queryCode').then( data => {
                if (data.data.status === 'success') {
                    console.log(data.data.data.text)
                   this.codeObj = data.data.data
                }
            }).catch( err => {
                console.log(err)
            })
        },
        addComment () {
        if (this.verification()) {
            this.error = ''
            axios.post('/addComment', {
                bid: this.article.id,
                use: this.use,
                email: this.email,
                commentContent: this.commentContent,
                parentUse: this.replyUse
            }).then(data => {
                console.log(data)
                if (data.data.status === 'success') {
                    alert(data.data.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        }
        },
        getComments () {
            let url = `/queryComPage?page=${(this.page - 1)*this.pageSize}&pageSize=${this.pageSize}&bid=${this.article.id}`
            axios.get(url).then( data => {
                if (data.data.msg === '成功') {
                    let values = data.data.data
                    console.log(values)
                    let arr = []
                    values.forEach(item => {
                        let temp = {}
                        temp.content = item.comments.replace(/<[^>]+>/g, '')
                        temp.email = item.email
                        temp.use = item['user_name']
                        temp.ctime = moment(item.ctime).format('YYYY年MM月DD日 hh:mm')
                        if (item.parentUse) {
                            temp.parentUse = item.parentUse
                        }
                        arr.push(temp)
                    })
                    this.commentList = arr
                } else {
                    throw new Error('请求失败')
                }
            }, err => {
                console.log(err)
            })
        },
        getPage (item) {
            console.log(item)
            this.page = item
            this.getComments()
        },
        getCount () {
            let url = `/queryComCount?bid=${this.article.id}`
            axios.get(url).then(data => {

                if (data.data.msg === '成功') {
                    this.count = data.data.data[0].count
                    console.log(this.count)
                }
            })
        },
        reply (use) {
            this.replyUse = use
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
            console.log(arr)
            return arr
        }
    },
    created () {
        this.getBlog()
        this.queryComCode()
    }
})