const fs = require('fs')

let globalConfig = {},
    conf = fs.readFileSync('./server.conf').toString(),
    confArr = conf.split('\r\n')

for (let i = 0; i < confArr.length; i++) {
    let temp = confArr[i].split('=')
    globalConfig[temp[0]] = temp[1]
}

module.exports = globalConfig