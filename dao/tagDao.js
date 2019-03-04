const dao = require('./DButil')

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

module.exports = {
    innerTag,
    queryTag,
    queryTagPage
}