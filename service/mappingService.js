const mappingDao = require('../dao/mappingDao')

function innerMapping (tagId, blogId, ctime, utime, success) {
    mappingDao.innerMapping(tagId, blogId, ctime, utime, success)
}

function queryBlogIdByTag (tagId, success) {
    mappingDao.queryBlogIdByTag(tagId, success)
}

module.exports = {
    innerMapping,
    queryBlogIdByTag
}