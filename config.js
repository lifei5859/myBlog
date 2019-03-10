const fs = require('fs') //引入文件方法
//创建配置对象
let globalConfig = {},
    conf = fs.readFileSync('./server.conf').toString(),
    confArr = conf.split('\r\n')
//读取配置文件信息
for (let i = 0; i < confArr.length; i++) {
    let temp = confArr[i].split('=')
    globalConfig[temp[0]] = temp[1]
}
// 导出配置对象
module.exports = globalConfig