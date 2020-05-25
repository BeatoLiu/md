const cheerio = require('cheerio')
const axios = require('axios')

let url = 'https://www.doutula.com/article/list/?page=1'

// 获取总页数
async function getNum(url){
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)
    let btnLength = $('.pagination li').length
    let allNum = $('.pagination li').eq(btnLength - 2).find('a').text()
    return allNum
}
//
async function parsePage(pageUrl, titlte) {
    // console.log(titlte)
    let res = await axios.get(pageUrl)
    let $ = cheerio.load(res.data)
    $('.pic-content img').each((idx,item) => {
        let img = $(item).attr('src')
        console.log(img)
    })
    

}
axios.get(url).then(res => {
    // console.log(res.data)
    let $ = cheerio.load(res.data)
    $('#home .col-sm-9>a').each((idx, item) => {
        let pageUrl = $(item).attr('href')
        let titlte = $(item).find('.random_title').text()
        let reg = /(.*?)\d/igs;
        let title = reg.exec(titlte)[1]
        console.log(titlte)
        parsePage(pageUrl,title)
    })
})