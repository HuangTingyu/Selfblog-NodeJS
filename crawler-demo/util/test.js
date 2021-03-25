// let a = 'https://www.baidu.com,https://www.zhihu.com,'
// let b = 'https://www.bilibili.com'
// let c = 'https://www.google.com'

// let linkArr = []
// linkArr.push(a)
// linkArr.push(b)
// linkArr.push(c)
// console.log(linkArr.join(','))


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
console.log(getTime())