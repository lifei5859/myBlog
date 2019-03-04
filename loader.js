const fs = require('fs')
const globalConfig = require('./config')

let webPaths = fs.readdirSync(globalConfig['web_path'])
let pathMap = new Map()

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

console.log(pathMap)
module.exports = pathMap