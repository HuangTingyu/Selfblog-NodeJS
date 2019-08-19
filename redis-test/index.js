const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

// 测试
// redis.print可以查看设置是否成功
// 成功的话，会返回Reply: OK
redisClient.set('myname', 'sakura', redis.print)
redisClient.get('myname', (err, val) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('val', val)
})

//退出
redisClient.quit()