const mappingDao = require('../dao/mappingDao')

function innerMapping (tagId, blogId, ctime, utime, success) {
    mappingDao.innerMapping(tagId, blogId, ctime, utime, success)
}

function queryBlogIdByTag (tagId, page, pageSize, success) {
    mappingDao.queryBlogIdByTag(tagId, page, pageSize, success)
}

function queryCountByTag (tagId, success) {
    mappingDao.queryCountByTag(tagId, success)
}

module.exports = {
    innerMapping,
    queryBlogIdByTag,
    queryCountByTag
}