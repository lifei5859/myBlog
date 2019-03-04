const articleDao = require('../dao/articleDao')
function innerArticle (content, title, views, tags, utime, ctime, success) {
    articleDao.innerArticle(content, title, views, tags, utime, ctime, success)
}

function queryArt (page, pageSize, success) {
    articleDao.queryArtByPage(page, pageSize, success)
}

function queryCount (success) {
    articleDao.queryCount(success)
}

function queryArtById (id, success) {
    articleDao.queryArtById(id, success)
}

function addView (num, success) {
    articleDao.addView(num, success)

}
module.exports = {
    innerArticle,
    queryArt,
    queryCount,
    queryArtById
}