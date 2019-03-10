const dao = require('./DButil')  //引入连接数据库方法
//向文章表中写入数据
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
// 分页查询文章
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
//查询文章总数
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
//根据id查询文章
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
//文章浏览次数变化
function addView (id, success) {
    let updateSql = 'update blog_articles set views = views + 1 where id = ?;'
    let connect = dao.createConnection()
    let arg = [id]
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
//查询热门文章
function queryNowHots (success) {
    let querySql = 'select * from blog_articles order by views desc limit 0, 9;'
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
//关键字模糊搜索
function queryBlogByKeyword (keyword, success) {
    let querySql = 'select * from blog_articles where concat(title, tags) like "%"?"%";'
    let connect = dao.createConnection()
    let arg = [keyword]
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
//将方法导出
module.exports = {
    innerArticle,
    queryArtByPage,
    queryCount,
    queryArtById,
    addView,
    queryNowHots,
    queryBlogByKeyword
}