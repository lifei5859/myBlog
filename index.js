const express = require('express')  //引入express框架
const globalConfig = require('./config')  //引入配置对象
const loader = require('./loader')  // 引入方法库
let server = new express() //创建express实例
//绑定页面路径
server.use(express.static('./page/'))

server.post('/innerEveryday', loader.get('/innerEveryday'))
server.post('/innerArt', loader.get('/innerArt'))
server.get('/queryEveryday', loader.get('/queryEveryday'))
server.get('/queryArt', loader.get('/queryArt'))
server.get('/queryCount', loader.get('/queryCount'))
server.get('/queryArtById', loader.get('/queryArtById'))
server.post('/addComment', loader.get('/addComment'))
server.get('/queryCode', loader.get('/queryCode'))
server.get('/queryComPage', loader.get('/queryComPage'))
server.get('/queryComCount', loader.get('/queryComCount'))
server.get('/getTagPage', loader.get('/getTagPage'))
server.get('/queryMappingByTag', loader.get('/queryMappingByTag'))
server.get('/queryNowHots', loader.get('/queryNowHots'))
server.get('/queryNewCom', loader.get('/queryNewCom'))
server.get('/queryCountByTag', loader.get('/queryCountByTag'))
server.get('/queryBlogByKeyword', loader.get('/queryBlogByKeyword'))
// 绑定端口号
server.listen(globalConfig['port'], () => {
    console.log(`服务器已启动， 通过 http://127.0.0.1:${globalConfig['port']} 访问`)
})