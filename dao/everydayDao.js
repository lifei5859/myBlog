const dao = require('./DButil')

function innerEveryday (content, ctime, success) {
    let insertSql = 'insert into every_day (content, ctime) values (?, ?)'
    let connect = dao.createConnection()
    let arg = [content, ctime]
    connect.connect()
    connect.query(insertSql, arg, (err, result) => {
        if (err) {
            throw new Error(`数据写入错误: ${err}`)
        } else {
            success(result)
        }
    })
    connect.end()
}

function queryEveryday (success) {
    let querySql = 'select * from every_day order by id desc limit 1;'
    let connect = dao.createConnection()
    let arg = []
    connect.connect()
    connect.query(querySql, arg, (err, result) => {
        if (err) {
            throw new Error(`数据写入错误: ${err}`)
        } else {
            success(result)
        }
    })
    connect.end()
}

module.exports = {
    innerEveryday,
    queryEveryday
}