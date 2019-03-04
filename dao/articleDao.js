const dao = require('./everydayDao')

function innerEveryday (content, title, views, tags, utime, ctime, success) {
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