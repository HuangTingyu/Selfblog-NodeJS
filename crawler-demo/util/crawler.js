const fs = require('fs')
const puppeteer = require('puppeteer')

let rawData = fs.readFileSync(('../assets/httpLink.json'), 'utf8')
let allLink = JSON.parse(rawData)
let allLinkLength = allLink.length
let count = 0


async function Crawler() {
    let crawlerLink = allLink[count]
    await crawlering(crawlerLink)
    count ++
    if (count < allLinkLength) {
        Crawler() 
    }
}



async function crawlering(crawlerLink){
    const browers = await puppeteer.launch()
    //启动新页面
    const page = await browers.newPage()
    //链接网址
    await page.goto(crawlerLink)
    
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
    linkArr.push(crawlerLink)
    linkArr.push(aTags)
    linkArr.push(imgs)
    linkArr.push(scripts)
    linkArr.push(links)

    
    fs.appendFileSync("../assets/testCrawler.csv", linkArr.join(','), (err) => {
        console.log(err || "done")
    })
    fs.appendFileSync("../assets/testCrawler.csv", '\n', (err) => {
        console.log(err)
    })

    log(crawlerLink)
    
    console.log('test')
    await browers.close()
    return
}

function getTime() {
    const date = new Date()
    const Y = date.getFullYear() + ''
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ''
    const D = date.getDate() + ''
    const H = date.getHours()       //获取当前小时数(0-23)
    const Min = date.getMinutes()     //获取当前分钟数(0-59)
    const Sec = date.getSeconds()  
    return Y + M + D + '-'+ H + ':' + Min + ':' + Sec
}

function log(crawlerLink) {
    let log = getTime() +  '——count——' + count + '——crawlerLink——' + crawlerLink+ '\n'
    fs.appendFileSync('../assets/crawlerLog.txt', log, (err) => {
        console.log(err)
    })
}

Crawler()
