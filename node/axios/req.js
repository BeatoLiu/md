let axios = require('axios')
let iconvLite = require('iconv-lite')

let url = 'https://www.dytt8.net/index.htm'
let url1 = 'http://www.6vgood.com/'

function req(url){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            responseType:'stream'
        }).then(res=>{
            let chunks = [];
            res.data.on('data',chunk=>{
                chunks.push(chunk);
            });
            res.data.on('end',()=>{
                let buffer = Buffer.concat(chunks);
                //通过iconv来进行转化。
                let str = iconvLite.decode(buffer,'gbk');
                resolve(str);
            })
        }).catch(err=>reject(err))
    })
}

async function getMovieUrl(url) {
    let data = await req(url)
    let reg = /<div id="menu"><div class="contain"><ul>(.*?)<\/ul>/igs
    let result = reg.exec(data)[1]
    // console.log(res[1])
    let reg1 = /<a href="(.*?)">(.*?)<\/a>/igs

    let objArr = []
    let res
    while (res = reg1.exec(result)) {
        objArr.push({
            name: res[2],
            url: res[1]
        })
    }
    // console.log(reg1.exec(result))
    // console.log(reg1.exec(res))
    console.log(objArr)
}
getMovieUrl(url)