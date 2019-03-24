const http = require('http')
const server = http.createServer((req, res) => {
    console.log('request come', request.url)
    res.end('hello world')
})
server.listen(8000)

console.log('server listening on 8000')