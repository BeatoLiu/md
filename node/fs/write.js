var fs = require('fs')

// fs.writeFile('../../node.md','## 文件系统', {flag: 'a',encoding:'utf-8'},(err)=>{
//     if(err) console.log('success')
//     else console.log(err)
// })

// 封装成promise方法

function fswrite(path,data){
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, {flag: 'a'}, err => {
            if (err) reject(err)
            else resolve()
        })
    })
} 