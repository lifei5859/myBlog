const createTime = require('../util/dateUtil')
const respUtil = require('../util/respUtil')
const everydayDao = require('../service/everyDayService')
let path = new Map()

function innerEvery (request, response) {
    request.on('data', data => {
        let val = data.toString().trim().replace(/；/g, ';')
        cosnole.log(val)
        everydayDao.innerEvery(val, createTime(), resp => {
            response.writeHead(200)
            response.write(respUtil('success', '添加成功', null))
            response.end()
        })
    })
}
path.set('/innerEveryday', innerEvery)

function queryEvery (request, response) {
    everydayDao.queryEvery(resp => {
        console.log(respUtil('success', '添加成功', resp))
        response.writeHead(200)
        response.write(respUtil('success', '成功', resp))
        response.end()
    })
}
path.set('/queryEveryday', queryEvery)

module.exports.path = path