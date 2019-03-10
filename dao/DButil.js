const mysql = require('mysql')
//连接数据库
function createConnection () {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: 'lifei5858',
        database: 'myblog'
    })
    return connection
}
//将连接数据库方法导出
module.exports.createConnection = createConnection