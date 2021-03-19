const fs = require('fs')

fs.readFile('../raw/rawLink.txt', 'utf-8', (err, data) => {
    let rawArr = data.split(/(\n)/)
    console.log(rawArr.length)
    rawArr.forEach((rawLink, index) => {
        let link = rawLink.replace(/\s*/g, '')
        if (index < 20 && link) {
            console.log(link)
        }
    })
})