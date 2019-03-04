const article = require('../service/articleService')
const createTime = require('../util/dateUtil')
const respUtil = require('../util/respUtil')
const tagDao = require('../service/tagService')
const mapping = require('../service/mappingService')
const url = require('url')
console.log(createTime())
let path = new Map()

function innerArt (request, response) {
    let par = url.parse(request.url, true).query
    let tags = par.tags.trim().replace(/，/g, ',')
    let title = par.title.trim()
    request.on('data', data => {
        article.innerArticle(data, title, 0, tags, createTime(), createTime(), function (resp) {
            // console.log(resp)
            response.writeHead(200)
            response.write(respUtil('success', '添加成功', null))
            response.end()
            // console.log(JSON.parse(resp).insertId)
            let articleId = JSON.parse(resp).insertId
            let tagList = tags.split(',')
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] === '') {
                    continue
                } else {
                    queryTag(tagList[i], articleId)
                }
            }
        })
    })
}

function queryTag (tag, articleId) {
    tagDao.queryTag(tag, function (resp) {
        if(resp == null || resp.length === 0) {
            tagDao.innerTag(tag, createTime(), createTime(), function (resp) {
                innerMap(JSON.parse(resp).insertId, articleId)
            })
        } else {
            // console.log(resp[0].id)
            // console.log(articleId)
            innerMap(resp[0].id, articleId)
        }
    })
}

function innerMap (tagID, articleId) {
    mapping.innerMapping(tagID, articleId, createTime(), createTime(), function (resp) {})
}

path.set('/innerArt', innerArt)

function queryArt (request, response) {
    let parse = url.parse(request.url, true).query
    // console.log(parse)
    article.queryArt( Number(parse['page']), Number(parse['pageSize']),resp => {
        // console.log(respUtil('success', '成功', resp))
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}

path.set('/queryArt', queryArt)

function queryCount (request, response) {
    article.queryCount(resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}

path.set('/queryCount', queryCount)

function queryArtById (request, response) {
    let parse = url.parse(request.url, true).query
    article.queryArtById(parse['bid'], resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}

path.set('/queryArtById', queryArtById)

module.exports.path = path