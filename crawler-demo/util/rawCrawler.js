const fs = require('fs')
const https = require('https')
const http = require('http')
const puppeteer = require('puppeteer')

const link = 'http://qiandongnan.offcn.com/html/2021/01/26429.html'


// fs.readFile('../raw/rawLink.txt', 'utf-8', (err, data) => {
//     let rawArr = data.split(/(\n)/)
//     console.log(rawArr.length)
//     rawArr.forEach((rawLink, index) => {
//         let link = rawLink.replace(/\s*/g, '')
//         if (index < 20 && link) {
//             console.log(link)
//         }
//     })
// })


// let testLink = 'http://gaotu05.com/9tMyjMJ_QoZgTJ'
// http.get(testLink, (res) => {
//     let error
//     if (res.statusCode === 302) {
//         error = new Error('请求失败')
//     }
//     if (error) {
//         console.error(error)
//         return
//     }
// }).on('error', (e) => {
//     console.error(e)
// })
//启动浏览器
async function getLink(){
    const browers = await puppeteer.launch()
    //启动新页面
    const page = await browers.newPage()
    //链接网址
    await page.goto(link)
    
    // console.log(page)
    const aTags = await page.$$eval('a', ele => {
        let linkArr = []
        ele.forEach(item => {
            item && item.href && linkArr.push(item.href)
        })
        return linkArr.join(',')
    })
    const imgs = await page.$$eval('img', ele => {
        let linkArr = []
        ele.forEach(item => {
            item && item.src && linkArr.push(item.src)
        })
        return linkArr.join(',')
    })
    const scripts = await page.$$eval('script', ele => {
        let linkArr = []
        ele.forEach(item => {
            item && item.src && linkArr.push(item.src)
        })
        return linkArr.join(',')
    })
    const links = await page.$$eval('link', ele => {
        let linkArr = []
        ele.forEach(item => {
            item && item.href && linkArr.push(item.href)
        })
        return linkArr.join(',')
    })
    let linkArr = []
    linkArr.push(aTags)
    linkArr.push(imgs)
    linkArr.push(scripts)
    linkArr.push(links)

    
    fs.writeFile("../assets/writeCsv.csv", linkArr.join(','), (err) => {
        console.log(err || "done")
    })
}

getLink()
