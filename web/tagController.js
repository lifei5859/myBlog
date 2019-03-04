const tagDao = require('../service/tagService')
const createTime = require('../util/dateUtil')
const respUtil = require('../util/respUtil')
// const mappingDao = require('../service/mappingService')
// const code = require('svg-captcha')
const url = require('url')

let path = new Map()

function getTagPage (request, response) {
    tagDao.queryTagPage(resp => {
        let arr = resp.sort(() => {return 0.5 - Math.random()})
        response.writeHead(200)
        response.end(respUtil('success', '成功', arr))
    })
}

path.set('/getTagPage', getTagPage)



module.exports.path = path