const respUtil = require('../util/respUtil')
const mappingDao = require('../service/mappingService')
const url = require('url')

let path = new Map()

function queryMappingByTag (request, response) {
    let params = url.parse(request.url, true).query
    mappingDao.queryBlogIdByTag(Number(params.tid), resp => {
        let temp = []
        resp.forEach( item => {
            temp.push(item['blog_id'])
        })
        response.writeHead(200)
        response.end(respUtil('success', '成功', temp))
    })
}

path.set('/queryMappingByTag', queryMappingByTag)

module.exports.path = path