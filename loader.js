const fs = require('fs')  //引入文件方法
const globalConfig = require('./config') //引入配置对象
//获取方法库路径配置信息
let webPaths = fs.readdirSync(globalConfig['web_path'])
//创建方法库
let pathMap = new Map()
//读取方法并放入方法库
for (let i = 0; i < webPaths.length; i++) {
    let temp = require(`./${ globalConfig['web_path'] }/${ webPaths[i] }`)
    if (temp.path) {
        for (var [k, v] of temp.path) {
            if (pathMap.get(k) == null) {
                pathMap.set(k, v)
            } else {
                throw new Error(`url path异常，url: ${k}`)
            }
        }
    }
}
// console.log(pathMap)
// 导出方法库
module.exports = pathMap