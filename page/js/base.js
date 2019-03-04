let rightBox = new Vue({
    el: '#right',
    data: {
        tags: [],
        nowHots: [],
        newComments: []
    },
    computed: {
        // tagStyle () {
        //     let num = () => {
        //         return parseInt(Math.random()*255)
        //     }
        //     let color = `color:rgb(${num()},${num()},${num()})`
        //
        //     let str = parseInt(Math.random()*20 + 8)
        //     let size = `font-size: ${str}px`
        //      console.log(`${color};${size}`)
        //     return `${color};${size}`
        // }
    },
    methods: {
        tagStyle () {
            let num = () => {
                return parseInt(Math.random()*255)
            }
            let color = `color:rgb(${num()},${num()},${num()})`

            let str = parseInt(Math.random()*20 + 8)
            let size = `font-size: ${str}px`
            console.log(`${color};${size}`)
            return `${color};${size}`
        },
        queryTag () {
            axios.get('/getTagPage').then(data => {
                if (data.data.status === 'success') {
                    let arr = []
                    console.log(data.data.data)
                    data.data.data.forEach(item => {
                        let obj = {}
                        obj.tag = item.tag
                        obj.id = item.id
                        arr.push(obj)
                    })
                    this.tags = arr
                }
            }).catch(err => {
                console.log(err)
            })
        },
        queryBlogByTag (tid) {
            // console.log(tid)
            axios.get(`/queryMappingByTag?tid=${tid}`).then( data => {
                console.log(data)
            }).catch(err => {
                console.log(err)
            })
        },
        queryNowHots () {
            axios.get().then(data => {

            }).catch(err => {
                console.log(err)
            })
        },
        queryNewComments () {
            axios.get().then(data => {

            }).catch(err => {
                console.log(err)
            })
        }
    },
    created () {
        this.queryTag ()
    }
})

// let nowHot = new Vue ()