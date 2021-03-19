const fs = require('fs')
const https = require('https')
const http = require('http')

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


let testLink = 'http://gaotu05.com/9tMyjMJ_QoZgTJ'
http.get(testLink, (res) => {
    let error
    if (res.statusCode === 302) {
        error = new Error('请求失败')
    }
    if (error) {
        console.error(error)
        return
    }
}).on('error', (e) => {
    console.error(e)
})