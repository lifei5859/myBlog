const comDao = require('../service/commentService') //引入留言数据库方法
const createTime = require('../util/dateUtil')  //引入生成时间方法
const respUtil = require('../util/respUtil')  // 引入处理返回数据方法
const code = require('svg-captcha') //引入生成验证码方法
const url = require('url')  //引入url方法
//创建方法容器
let path = new Map()
//写入留言方法
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
//写入留言方法放入容器
path.set('/addComment', addComment)
//生成二维码方法
function queryCode (request, response) {
    let ico = code.create({
        fontSize: 50,
        width: 100,
        height: 30
    })
    response.writeHead(200)
    response.end(respUtil('success', '成功', ico))
}
//生成二维码方法放入容器
path.set('/queryCode', queryCode)
//分页查询留言
function queryComPage (request, response) {
    let parse = url.parse(request.url, true).query
    // console.log('page', parse)
    comDao.queryComPage(Number(parse.bid), Number(parse.page), Number(parse.pageSize), resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//分页查询留言方法放入容器
path.set('/queryComPage', queryComPage)
//查询留言总数
function queryComCount (request, response) {
    let parse = url.parse(request.url, true).query
    comDao.queryComCount(Number(parse.bid), resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//查询留言总数方法放入容器
path.set('/queryComCount', queryComCount)
//查询最新留言方法
function queryNewCom (request, response) {
    comDao.queryNewComments(resp => {
        response.writeHead(200)
        response.end(respUtil('success', '成功', resp))
    })
}
//查询最新留言方法放入容器
path.set('/queryNewCom', queryNewCom)
//方法容器导出
module.exports.path = path