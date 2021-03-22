const fs = require('fs')
const puppeteer = require('puppeteer')

let allLink = []
let count = 0

fs.readFile(('../assets/httpLink.json'), 'utf8', (err, rawData) => {
    allLink = JSON.parse(rawData)
})
const allLinkLength = allLink.length

async function crawlering(link){
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

    
    fs.appendFile("../assets/writeCsv.csv", linkArr.join(','), (err) => {
        console.log(err || "done")
    })
    await browers.close()
    return
}


async function Crawler() {
    let crawlerLink = allLink[count]
    fs.appendFile("../assets/writeCsv.csv", '\n', (err) => {
        console.log(err || "done")
    })

}
