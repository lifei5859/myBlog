const comDao = require('../service/commentService')
const createTime = require('../util/dateUtil')
const respUtil = require('../util/respUtil')
const code = require('svg-captcha')
const url = require('url')

let path = new Map()

function addComment (request, response) {
    request.on('data', data => {
       let temp =  JSON.parse(data.toString())
        console.log(temp)
        comDao.addCom(Number(temp.bid), -1, temp.use, temp.email, temp.commentContent, createTime(), createTime(), temp.parentUse,resp => {
            response.writeHead(200)
            response.end(respUtil('success', '成功', resp))
        })
    })
}

path.set('/addComment', addComment)

function queryCode (request, response) {
    let ico = code.create({
        fontSize: 50,
        width: 100,
        height: 30
    })
    response.writeHead(200)
    response.end(respUtil('success', '成功', ico))
}

path.set('/queryCode', queryCode)

function queryComPage (request, response) {
    let parse = url.parse(request.url, true).query
    console.log('page', parse)
    comDao.queryComPage(Number(parse.bid), Number(parse.page), Number(parse.pageSize), resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}

path.set('/queryComPage', queryComPage)

function queryComCount (request, response) {
    let parse = url.parse(request.url, true).query
    comDao.queryComCount(Number(parse.bid), resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}

path.set('/queryComCount', queryComCount)

module.exports.path = path