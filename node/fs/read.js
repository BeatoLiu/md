var fs = require('fs')

var fd = fs.openSync('../../node.md','r')
// 不建议使用同步函数读取文件，应使用异步函数
var content = fs.readFileSync('../../node.md')
console.log(fd)
console.log(content.toString())