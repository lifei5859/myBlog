const everyDao = require('../dao/everydayDao')

function innerEvery (content, ctime, success) {
    everyDao.innerEveryday(content, ctime, success)
}

function queryEvery (success) {
    everyDao.queryEveryday(success)
}

module.exports = {
    innerEvery,
    queryEvery
}