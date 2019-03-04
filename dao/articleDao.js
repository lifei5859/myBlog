const dao = require('./DButil')

function innerArticle (content, title, views, tags, utime, ctime, success) {
    let insertSql = 'insert into blog_articles (content, title, views, tags, utime, ctime) values (?, ?, ?, ?, ?, ?)'
    let connect = dao.createConnection()
    let arg = [content, title, views, tags, utime, ctime]
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

function queryArtByPage (page, pageSize, success) {
    let querySql = 'select * from blog_articles order by id desc limit ?, ?;'
    let connect = dao.createConnection()
    let arg = [page * pageSize, pageSize]
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

function queryCount (success) {
    let querySql = 'select count(1) as count from blog_articles;'
    let connect = dao.createConnection()
    let arg = []
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if(err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            console.log(result)
            success(result)
        }
    })
    connect.end()
}

function queryArtById(id, success) {
    let querySql = 'select * from blog_articles where id=?;'
    let connect = dao.createConnection()
    let arg = [id]
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

function addView (num, success) {
    let updateSql = 'update blog_articles set views = ?;'
    let connect = dao.createConnection()
    let arg = [num]
    connect.connect()
    connect.query(updateSql, arg, (err, result) => {
        if(err) {
            throw Error (`数据查询错误: ${err}`)
        } else {
            success(result)
        }
    })
    connect.end()
}

module.exports = {
    innerArticle,
    queryArtByPage,
    queryCount,
    queryArtById,
    addView
}