const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

function set(key, val) {
    // 如果传入的value是一个对象
    // 要通过json把对象转化成字符串
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    // get 是一个异步操作，要通过promise进行封装
    const promise = new Promise((resolve, reject) => {

        redisClient.get('myname', (err, val) => {
            if (err) {
                reject(err)
                return
            }
            resolve(val)
        })

        //退出
        redisClient.quit()

    })

    return promise
}
module.exports = {
    set,
    get
}