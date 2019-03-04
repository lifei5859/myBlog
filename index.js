const express = require('express')

let server = new express()

server.use(express.static('./page/'))

server.listen(10086, () => {
    console.log('服务器已启动， 通过 http://127.0.0.1:10086 访问')
})