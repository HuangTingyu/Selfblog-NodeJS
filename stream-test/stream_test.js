// 标准输入输出
// process.stdin.pipe(process.stdout)
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // 输入流到输出
        req.pipe(res)
    }
})
server.listen(8000)