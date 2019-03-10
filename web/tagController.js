const tagDao = require('../service/tagService')  //引入标签数据库方法
// const createTime = require('../util/dateUtil')
const respUtil = require('../util/respUtil') //引入处理返回数据方法
// const mappingDao = require('../service/mappingService')
// const code = require('svg-captcha')
// const url = require('url')
// 创建方法容器
let path = new Map()
//查询标签把标签乱序
function getTagPage (request, response) {
    tagDao.queryTagPage(resp => {
        let arr = resp.sort(() => {return 0.5 - Math.random()})
        response.writeHead(200)
        response.end(respUtil('success', '成功', arr))
    })
}
//查询标签把标签乱序方法放入容器
path.set('/getTagPage', getTagPage)
//导出方法容器
module.exports.path = path