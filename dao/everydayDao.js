const dao = require('./DButil') //引入连接数据库方法
//写入每日一句
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
//查询每日一句
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
//方法导出
module.exports = {
    innerEveryday,
    queryEveryday
}