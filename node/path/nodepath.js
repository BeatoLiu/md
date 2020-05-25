let path = require('path')

let os =  require('os')

// console.log(path)

let strPath = 'https://www.cnblogs.com/zhouheblog/p/12883780.html'
// 获取路径信息扩展名
let info = path.extname(strPath) 
console.log(info)// .html

let arr=['/sxt','qianduan','zhongji']
// 拼接路径
let info1 = path.resolve(...arr)
console.log(info1)

//获取当前执行目录的完整路径
console.log(__dirname)
// 获取当前的执行文件
console.log(__filename)
// 解析路径
console.log(path.parse(__filename))

// 查看cpu
console.log(os.cpus())