const fs = require('fs')
const path = require('path')

//fileName，当前文件路径
const fileName = path.resolve(__dirname, 'fs_test.txt')

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }

//     // data是buffer类型(二进制类型，需要转换为字符串
//     console.log(data.toString())
// })

// 写入文件
// const content = '新写入的内容 2019-08-29'
// const opt = {
//     flag: 'a' //追加写入
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.error(err)
//     }
// })

// 判断文件是否存在(异步)
fs.exists(fileName, (exist) => {
    console.log('exist', exist)
})