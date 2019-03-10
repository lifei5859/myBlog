const dao = require('./DButil') //导入连接数据库方法
//写入标签与文章映射
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
//根据标签查询符合条件文章
function queryBlogIdByTag (tagId, page, pageSize, success) {
    let querySql = 'select * from tag_blog_mapping where tag_id=? order by id desc limit ?, ?;'
    let connect = dao.createConnection()
    let arg = [tagId, page, pageSize]
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
//根据标签查询符合条件的文章总数
function queryCountByTag (tagId, success) {
    let querySql = 'select count(1) as count from tag_blog_mapping where tag_id=?;'
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
//方法导出
module.exports = {
    innerMapping,
    queryBlogIdByTag,
    queryCountByTag
}