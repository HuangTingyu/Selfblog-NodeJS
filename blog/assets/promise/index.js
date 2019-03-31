const fs = require('fs')
const path = require('path')

// callback方式读取文件内容
// function getFileContent (fileName, callback) {
//   // path.resovle 用于拼接文件路径
//   const fullFileName = path.resolve(__dirname, 'files', fileName)
//   // console.log(fullFileName)
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       // 如果没有读取到，输出错误
//       console.error(err)
//       return
//     }
//     callback(
//       JSON.parse(data.toString())
//     )
//   })
// }

// 测试 callback-hell
// getFileContent('a.json', aData => {
//   console.log('a data', aData)
//   getFileContent(aData.next, bData => {
//     console.log('b data', bData)
//     getFileContent(bData.next, cData => {
//       console.log('c data', cData)
//     })
//   })
// })

function getFileContent(fileName) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log('a data', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('b data', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('c data', cData)
})