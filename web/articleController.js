const article = require('../service/articleService') //引入文章数据库方法
const createTime = require('../util/dateUtil')  //引入创建时间方法
const respUtil = require('../util/respUtil') //引入处理返回数据方法
const tagDao = require('../service/tagService')  //引入标签数据库方法
const mapping = require('../service/mappingService')  //引入映射数据库方法
const url = require('url')  //引入url方法
//创建方法容器
let path = new Map()
//写入文章方法
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
//写入文章同时要写入标签这时要先看标签是否已经存在，存在则不用重新写入，不存在写入一个
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
//写入文章时要在映射表中写入映射
function innerMap (tagID, articleId) {
    mapping.innerMapping(tagID, articleId, createTime(), createTime(), function (resp) {})
}
//将写入文章方法放入容器
path.set('/innerArt', innerArt)
//分页查询所有文章
function queryArt (request, response) {
    let parse = url.parse(request.url, true).query
    // console.log(parse)
    article.queryArt( Number(parse['page']), Number(parse['pageSize']),resp => {
        // console.log(respUtil('success', '成功', resp))
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//将分页查询文章方法放入容器
path.set('/queryArt', queryArt)
//查询文章总数
function queryCount (request, response) {
    article.queryCount(resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//将查询文章总数方法放入容器
path.set('/queryCount', queryCount)
//根据文章id查询文章
function queryArtById (request, response) {
    let parse = url.parse(request.url, true).query
    article.addView(parse['bid'], resp => {})
    article.queryArtById(parse['bid'], resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))

    })
}
//将根据文章id查询文章方法放入容器
path.set('/queryArtById', queryArtById)
//查询热门文章
function queryNowHots (request, response) {
    article.queryNowHots(resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))

    })
}
//将查询热门文章方法放入容器
path.set('/queryNowHots', queryNowHots)
//根据标签查询文章
function queryMappingByTag (request, response) {
    let params = url.parse(request.url, true).query
    mapping.queryBlogIdByTag(Number(params.tid), parseInt(params.page), parseInt(params.pageSize), resp => {
        let temp = []
        let result = []
        resp.forEach( item => {
            temp.push(item['blog_id'])
        })
        temp.forEach(item => {
            article.queryArtById(item, resp => {
                let obj = resp[0]
                //因为查询过程为异步所以这里通过定时器将数据push进数组
                setTimeout(function () {
                    result.push(obj)
                    console.log()
                    //当查询参数与返回数据长度相同则向客户端返回数据
                    if (result.length === temp.length) {
                        response.writeHead(200)
                        response.end(respUtil('success', '成功', result))
                    }
                },)
            })
        })
    })
}
//将根据标签查询数据方法放入容器
path.set('/queryMappingByTag', queryMappingByTag)
//根据关键字查询文章
function queryBlogByKeyword (request, response) {
    let params = url.parse(request.url, true).query
    article.queryBlogByKeyword(params.K, resp => {
        console.log(resp)
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//把根据关键字方法查询文章方法放入容器
path.set('/queryBlogByKeyword', queryBlogByKeyword)
//把容器导出
module.exports.path = path