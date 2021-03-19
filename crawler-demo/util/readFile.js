const fs = require('fs')

fs.readFile('../raw/rawLink.txt', 'utf-8', (err, data) => {
    let rawArr = data.split(/(\n)/)
    console.log(rawArr.length)
    let httpLinks = []
    rawArr.forEach((rawLink, index) => {
        let link = rawLink.replace(/\s*/g, '')
        const reg = /(https):\/\/([\w.]+\/?)\S*/
        if (link && link.match(reg)) {
            httpLinks.push(link)
        }
    })
    let httpLinksStr = JSON.stringify(httpLinks)
    fs.writeFile('../assets/https.json', httpLinksStr, 'utf8', (err) => {
        if (err) {
            console.error(err)
        }
        console.log('done')
    })
    
})


// let arr = [1, 2, 3]
// let str = JSON.stringify(arr)
// fs.writeFile('../assets/httpLink.json', str, 'utf8', (err) => {
//     if (err) {
//         console.error(err)
//     }
//     console.log('done')
// })

// fs.readFile(('../assets/httpLink.json'), 'utf8', (err, rawData) => {
//     let data = JSON.parse(rawData)
//     console.log(data)
//  })