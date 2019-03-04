let rightBox = new Vue({
    el: '#right',
    data: {
        tags: [
            'telnet',
            '个人博客',
            '音乐',
            'Sunshine GirlE6mac',
            '数据结构',
            'seo蛋疼',
            'dedecms',
            '模拟航天飞机'
        ]
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
        }
    },
    created () {

    }
})