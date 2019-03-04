const dao = require('./DButil')

function addComment (bid, parent, userName, email, comment, ctime, utime, parentUse, success) {
    let insertSql = 'insert into comments (blog_id, parent, user_name, email , comments, ctime, utime, parentUse) values (?, ?, ?, ?, ?, ?, ?, ?);'
    let connect = dao.createConnection()
    let arg = [bid, parent, userName, email, comment, ctime, utime, parentUse]
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

function queryComPage (bid, page, pageSize, success) {
    let querySql = 'select * from comments where blog_id=? order by id desc limit ?, ?;'
    let connect = dao.createConnection()
    let arg = [bid, page, pageSize]
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if (err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            success(result)
        }
    })
}

function queryComCount (bid, success) {
    let querySql = 'select count(1) as count from comments where blog_id=? ;'
    let connect = dao.createConnection()
    let arg = [bid]
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if (err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            success(result)
        }
    })
}
module.exports = {
    addComment,
    queryComPage,
    queryComCount
}