const dao = require('./DButil')

function innerMapping (tagId, blogId, ctime, utime, success) {
    let insertSql = 'insert into tag_blog_mapping (tag_id, blog_id, ctime, utime) values (?, ?, ?, ?)'
    let connect = dao.createConnection()
    let arg = [tagId, blogId, ctime, utime]
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

function queryBlogIdByTag (tagId, success) {
    let querySql = 'select * from tag_blog_mapping where tag_id=?;'
    let connect = dao.createConnection()
    let arg = [tagId]
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

// function queryBlogIdByTag (tagId, success) {
//     let querySql = 'select * from tag_blog_mapping where tag_id=?;'
// }

module.exports = {
    innerMapping,
    queryBlogIdByTag
}