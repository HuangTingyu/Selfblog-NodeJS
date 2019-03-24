const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    console.log('method:', req.method) // GET
    const url = req.url // 获取完整的url
    console.log('url:', url)
        // 解析querystring,问号前面是路由，问号后面是URL参数
        // 把URL参数拆分出来，赋值给req.query
    req.query = querystring.parse(url.split('?')[1])
    console.log('query:', req.query)
        // 将querystring转化成字符串并返回
    res.end(
        JSON.stringify(req.query)
    )
})

server.listen(8000)
console.log('server listening on 8000')