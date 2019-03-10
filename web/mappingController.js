const respUtil = require('../util/respUtil')  //引入处理返回数据方法
const mappingDao = require('../service/mappingService')  //引入映射表数据库方法
const url = require('url')  //引入url
// 创建方法容器
let path = new Map()
// 查询符合标签的文章总数
function queryCountByTag (request, response) {
    let params = url.parse(request.url, true).query
    mappingDao.queryCountByTag(Number(params.tid), resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
// 查询符合标签的文章总数方法放入容器
path.set('/queryCountByTag', queryCountByTag)
//方法容器导出
module.exports.path = path