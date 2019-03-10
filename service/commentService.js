const commentsDao = require('../dao/commentsDao')

function addCom (bid, parent, userName, email, comment, ctime, utime, parentUse, success) {
    commentsDao.addComment(bid, parent, userName, email, comment, ctime, utime, parentUse, success)
}

function queryComPage (bid, page, pageSize, success) {
    commentsDao.queryComPage(bid, page, pageSize, success)
}

function queryComCount (bid, success) {
    commentsDao.queryComCount(bid, success)
}

function queryNewComments (success) {
    commentsDao.queryNewComments(success)
}

module.exports = {
    addCom,
    queryComPage,
    queryComCount,
    queryNewComments
}