const { add, mul } = require('./a')
const _ = require('lodash')
    // 解释什么是解构,上面1行等于下面3行
    // const opt = require('./a')
    // const add = opt.add
    // const mul = opt.mul
const sum = add(10, 20)
const result = mul(10, 20)

console.log(sum)
console.log(result)

const arr = _.concat([1, 2], 3)
console.log('arr...', arr)