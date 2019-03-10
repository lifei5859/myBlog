const createTime = require('../util/dateUtil')  //引入生成时间方法
const respUtil = require('../util/respUtil')  //引入处理返回数据方法
const everydayDao = require('../service/everyDayService')  //引入每日一句数据库方法
//创建方法容器
let path = new Map()
//写入每日一句方法
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
//写入每日一句方法放入容器
path.set('/innerEveryday', innerEvery)
//查询每日一句方法
function queryEvery (request, response) {
    everydayDao.queryEvery(resp => {
        console.log(respUtil('success', '添加成功', resp))
        response.writeHead(200)
        response.write(respUtil('success', '成功', resp))
        response.end()
    })
}
//查询每日一句方法放入容器
path.set('/queryEveryday', queryEvery)
//方法容器导出
module.exports.path = path