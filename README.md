## Selfblog-NodeJS
个人博客（NodeJS版本）

Commonjs-test演示了简单的CommonJS模块引入规范

debugger-test演示了简单的VSCode的debug方式，包括断点调试等

httpReq-test演示了简单的HTTP服务，GET请求，POST请求的发送

blog演示了博客后端接口的编写。

## blog启动方式

1.启动redis

开一个cmd，进入redis文件夹输入

```
redis-server.exe redis.windows.conf
```

再开一个cmd，不要关掉原来的

```
redis-cli.exe -h 127.0.0.1 -p 6379
```

2.启动nginx

```
./nginx.exe
```

3.启动项目

```
npm install
npm run dev
```

4.启动前端(html-test目录)

```
http-server -p 8001
```

## 浏览器打开(nginx反向代理)

- 博客首页

http://localhost:8080/index.html

- 管理后台

<http://localhost:8080/admin.html>

- 登录页面

<http://localhost:8080/login.html>

### 端口号(bin\www.js文件)

浏览器输入(localhost:8000进入项目)

浏览器端口号 —— 8000

### mysql数据库

账号 —— root

密码 —— 123

### vscode 智能提醒 nodejs

```
cnpm install typings -g
```

安装好之后，typings提示版本号

```
typings --version
```

进入项目根目录

```
typings init
```

产生 `typings.json` 文件之后，

```
typings install dt~node --global--save
```

## `nodejs`接口列表

- <http://localhost:8000/api/blog/list> 博客列表
- http://localhost:8000/api/blog/detail 博客详情
- http://localhost:8000/api/blog/new 新建博客
- http://localhost:8000/api/blog/update 更新博客
- http://localhost:8000/api/blog/del 删除博客

## 博客后端接口的实现及数据表的设计

### 博客（需求）

（1）  首页，作者主页，博客详情页

（2）  登录页

（3）  管理中心，新建页，编辑页

### 技术方案

（1）  数据如何存储

（2）  如何与前端对接，即接口设计

### 数据存储

（1）  博客（2）用户

### 存储博客

（1）  id（2）title（3）content（4）createtime（5）author

### 存储用户

（1）id（2）username（3）password（4）realname

### 接口设计

| 描述     | 接口     | 方法   | url参数          |
| ------ | ------ | ---- | -------------- |
| 获取博客列表 | list   | get  | author,keyword |
| 获取博客详情 | detail | get  | id             |
| 新增博客   | new    | post |                |
| 更新博客   | update | post | id             |
| 删除博客   | del    | post | id             |
| 登录     | login  | post |                |



### 开发接口

（1）  nodejs处理http请求

（2）  搭建开发环境

（3）  开发接口（暂不连接数据库，暂不考虑登录）

### 搭建环境

（1）  使用nodemon检测文件变化，自动重启node

（2）  使用cross-env设置环境变量

## cookie

1.每次发送http请求，会将请求域的cookie一起发送给server

2.server可以修改cookie并返回给浏览器

3.浏览器也可以通过js修改cookie(有限制)

## server端nodejs操作cookie

1.查看cookie

2.修改cookie

3.实现登录验证

### 解析cookie(`app.js` 文件)

```javascript
// 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
    })
```

### 获取cookie(router\user.js)

```javascript
// 登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
```

### 操作cookie(router\user.js)

```javascript
// 操作cookie
res.setHeader('Set-Cookie', `username=${data.username};path=/`)
```

登录成功之后，会在浏览器的cookie种下username。

参考代码，

```javascript
if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {

                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.username};path=/`)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

// 登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
```

浏览器输入<http://localhost:8000/api/user/login?username=lisi&password=123> ，

然后输入<http://localhost:8000/api/user/login-test>

可以看到页面上显示

```
{"data":{"username":"lisi"},"errno":0}
```

### cookie限制( `router/user.js` )

1.`httpOnly` 限制前端对cookie进行修改

```javascript
res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly`)
```

此处加上 `httpOnly`，限制前端的修改，不能再通过 `document.cookie` 修改cookie

检验httpOnly的方法——

login页面登录成功之后，<http://localhost:8000/api/user/login?username=lisi&password=123>

进入login-test页面，输入`document.cookie`，打印出一个空白字符串`""`

```javascript
if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {

                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.username};path=/`)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel({
                username: req.cookie.username
            }))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
```

2.设置cookie过期时间

```javascript
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登录
    if (method === 'GET' && req.path === '/api/user/login') {
        res.setHeader('Set-Cookie', `username=${data.username};
				path=/;httpOnly;expires=${getCookieExpires()}`)

    }
}
```

## session(`app.js`)

问题——cookie存储username会泄露个人信息。

解决——cookie存储userid，server端对应username，即server端存储用户信息。

```javascript
//session 数据
const SESSION_DATA = {}

const serverHandle = (req, res) => {
  // 解析session
    const userId = req.cookie.userId
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }

    } else {
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]
}
```

代码逻辑解析：

首先判断cookie中有没有userId

1.cookie中有userId

- 判断SESSION_DATA里面有没有userId对应的信息

  没有的话，初始化一个空对象

2.cookie中没有userId

userId将被设为时间+随机数，并且在session中存入userId对应的空对象。

## Redis

### 上述使用session存在的问题：

session是js变量，放在nodejs进程内存中

1.进程内存有限，访问量过大，可能造成内存暴增

2.正式线上运行是多进程，进程之间的内存无法共享

3.上线的时候会覆盖原来的代码，重启服务器

```javascript
//session 数据
const SESSION_DATA = {}
```

通过对象的方式保存`session` ，每次上线代码都会丢失。

### Redis介绍

web server 最常用的缓存数据库，数据放在内存中

相比mysql，访问速度快(内存和硬盘不是一个数量级的)

成本更高，可存储的数据量更小(内存的硬伤)

### session为什么适合redis

session访问频繁，对性能要求高

session可不考虑断电丢失数据的问题(内存的硬伤)

session数据量不会太大(相比mysql中存储的数据)

### 启动 `redis`

开一个cmd，进入redis文件夹输入

```
redis-server.exe redis.windows.conf
```

再开一个cmd，不要关掉原来的

```
redis-cli.exe -h 127.0.0.1 -p 6379
```

### 用redis存储session

1.完成nodejs连接redis的demo

2.封装成工具函数，供API使用

### 1.创建redis demo(reids-test)

```javascript
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
```

### 2.连接redis ( `src\conf\db.js` & `src\db\redis.js`)

```
 // redis
 REDIS_CONF = {
     host: '127.0.0.1',
     port: 6379
}
```

#### `app.js`

1.注释掉原来的session实现代码

```javascript
//session 数据
const SESSION_DATA = {}

// 解析session
let userId = req.cookie.userId
let needSetCookie = false
if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }

} else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
}
req.session = SESSION_DATA[userId]
```

2.使用redis保存session数据

```javascript
	let userId = req.cookie.userId
    let needSetCookie = false
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
            // 初始化 redis 中的 session
        set(userId, {})
    }

    // 获取session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
            if (sessionData === null) {
                // 初始化 redis 中的 session
                set(req.sessionId, {})
                    // 设置session
                req.session = {}
            } else {
                // 设置session
                req.session = sessionData
            }
            console.log('req.session', req.session)

            // 处理 post data
            return getPostData(req)
        }).then(postData => {})
```

#### `src\router\user.js`

把数据库中获得的信息同步到redis中

```javascript
// 同步到redis
set(req.sessionId, req.session)
```

具体操作如下

```javascript
if (method === 'GET' && req.path === '/api/user/login') {
  return result.then(data => {
            if (data.username) {

                // 操作cookie
                // res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`)

                // 设置session
                req.session.username = data.username
                req.session.realname = data.realname

                // 同步到redis
                set(req.sessionId, req.session)

                console.log('req.session is', req.session)
                return new SuccessModel()
            }
}
```

### 3.校验是否登录

```javascript
 const loginCheck = (req) => {
        if (!req.session.username) {
            return Promise.resolve(
                new ErrorModel('尚未登录')
            )
        }

    }
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {

        const loginCheckResult = loginCheck(req)

        if (loginCheckResult) {
            // 未登录
            return loginCheck
        }

        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })

    }
```

## Nginx配置

涉及到cookie，没办法用postman联调，配置nginx用于让前端调取后台接口。

### 和前端联调

1.登录功能依赖cookie，必须用浏览器来联调

2.cookie跨域不共享的，前端server端必须同域

3.需要用nginx做代理，让前后端同域

### 1.下载插件

前端目录(http-server)

```
cnpm install http-server -g
http-server -p 8001
```

### 2.配置nginx( `conf\nginx.conf` )

```
worker_processes  2;#开启双核

location / {
	proxy_pass http://localhost:8001;
}
		
location /api/ {
	proxy_pass http://localhost:8000;
}
```

测试配置文件

```
./nginx -t
```

启动nginx

```
./nginx.exe
```

浏览器输入——`<http://localhost:8080/index.html>`

成功进入博客首页，访问list接口成功。

## 日志管理

1.nodejs文件操作，nodejs stream

2.日志功能开发和使用

3.日志文件拆分，日志内容分析

### demo初步

存在缺陷——只能处理小的文本文件

详见 `fs_test` 目录下的 `fs_test.js`

### IO操作性能瓶颈

- IO包括 '网络IO' 和 '文件IO'
- IO最大的特点——慢

### stream

详细代码见 `stream-test` 目录

实时输出，我们键入的内容

`stdin` 表示输入的内容，通过pipe，流到 `stdout`，也就是把输入的内容打印出来。

demo1——

```js
process.stdin.pipe(process.stdout)
```

demo2——

可以把 `req` 和 `res`看作两个水桶，通过pipe这个管道连接起来。

```js
const http = require('http')
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        // 输入流到输出
        req.pipe(res)
    }
})
server.listen(8000)
```

postman发送一个json格式的数据到 `http://localhost:8000/`，返回相同的数据。

demo3——

客户端往server端传递数据

```js
 let postData = ''

// 客户端往server端传递数据
req.on('data', chunk => {
    postData += chunk.toString()
})

req.on('end', () => {
    if (!postData) {
     resolve({})
    }
    resolve(JSON.parse(postData))
})
```

demo4——

把文件 `bacra.txt` 里面的内容，复制到 `doom.txt`里面，详细代码见 `stream-test\stream_log.js`

### 应用

#### 1.产生日志

日志地址 —— blog/logs

代码逻辑—— src/utils/log.js + app.js

`app.js`

```js
const serverHandle = (req, res) => {
    // 记录access log
    access(`${req.method} —— ${req.url} —— ${req.headers['user-agent']} —— ${Date.now()}`)
```

#### 2.分析日志

demo——分析日志中，chrome浏览器的占比，详见 `src\utils\readline.js` 文件。

1.sql注入——窃取数据库内容

2.XSS攻击——窃取前端的cookie内容

3.密码加密

### PM2

#### 1.初始化

```
pm2 init
```

#### 2.配置文件 `ecosystem.json`

```
module.exports = {
  "apps": [
    {
      "name": "mywork",
      "cwd": "/srv/node-app/current",
      "script": "bin/www",
      "log_date_format": "YYYY-MM-DD HH:mm Z",
      "error_file": "/var/log/node-app/node-app.stderr.log",
      "out_file": "log/node-app.stdout.log",
      "pid_file": "pids/node-geo-api.pid",
      "instances": 6,
      "min_uptime": "200s",
      "max_restarts": 10,
      "max_memory_restart": "1M",
      "cron_restart": "1 0 * * *",
      "watch": false,
      "merge_logs": true,
      "exec_interpreter": "node",
      "exec_mode": "fork",
      "autorestart": false,
      "vizion": false
    }
  ]
}
```

#### 参数一览表

apps:json结构，apps是一个数组，每一个数组成员就是对应一个pm2中运行的应用

name:应用程序名称

cwd:应用程序所在的目录

script:应用程序的脚本路径

log_date_format:

error_file:自定义应用程序的错误日志文件

out_file:自定义应用程序日志文件

pid_file:自定义应用程序的pid文件

instances:占用多少个内核

max_memory_restart:最大启动内存，防止因内存泄漏，影响其他服务

min_uptime:最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量

max_restarts:设置应用程序异常退出重启的次数，默认15次（从0开始计数）

cron_restart:定时启动，解决重启能解决的问题

watch:是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，pm2会自动重载。这里也可以设置你要监控的文件。

merge_logs:

exec_interpreter:应用程序的脚本类型，这里使用的shell，默认是nodejs

exec_mode:应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork

autorestart:启用/禁用应用程序崩溃或退出时自动重启

vizion:启用/禁用vizion特性(版本控制)

#### 3.常用命令

- 启动

```
pm2 start ecosystem.json
```

- 服务详情查看

```
pm2 list
```

- 重启，可以加上服务id，比如id 为0 的服务

```
pm2 restart 0
```

或者

```
pm2 restart ecosystem.json
```

- 查日志

```
pm2 log
```

