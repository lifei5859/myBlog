const dao = require('./DButil')
//写入标签
function innerTag (tag, ctime, utime, success) {
    let insertSql = 'insert into tags (tag, ctime, utime) values (?, ?, ?)'
    let connect = dao.createConnection()
    let arg = [tag, ctime, utime]
    connect.connect()
    connect.query(insertSql, arg, (err, result) => {
        if(err) {
            throw Error (`数据写入错误: ${err}`)
        } else {
            success(JSON.stringify(result))
        }
    })
    connect.end()
}
//根据标签查询标签详情
function queryTag (tag, success) {
    let querySql = 'select * from tags where tag=?;'
    let connect = dao.createConnection()
    let arg = [tag]
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if(err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            success(result)
        }
    })
    connect.end()
}
//查询所有标签
function queryTagPage (success) {
    let querySql = 'select * from tags;'
    let connect = dao.createConnection()
    let arg = []
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if(err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            success(result)
        }
    })
    connect.end()
}
//方法导出
module.exports = {
    innerTag,
    queryTag,
    queryTagPage
}