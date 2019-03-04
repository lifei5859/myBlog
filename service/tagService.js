const tagDao = require('../dao/tagDao')

function queryTag (tag, success) {
    tagDao.queryTag(tag, success)
}

function innerTag (tag, ctime, utime, success) {
    tagDao.innerTag(tag, ctime, utime, success)
}

function queryTagPage (success) {
    tagDao.queryTagPage(success)
}

module.exports = {
    queryTag,
    innerTag,
    queryTagPage
}