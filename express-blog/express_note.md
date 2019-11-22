## 搭建环境

全局安装

```
cnpm install express-generator -g
express express-blog
cnpm install
npm start
```

安装相关依赖

```
npm install nodemon cross-env -D
```

`package.json`

```
"dev" : "cross-env NODE_ENV=dev nodemon ./bin/www"
```

环境处理 `app.js` 

开发环境下，就抛出error，非开发环境不把信息爆给用户。

```
res.locals.error = req.app.get('env') === 'dev' ? err : {}
```

## 实现对比

### cookie

1.野生获取cookie的方式

```js
	// 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')

        // trim方法，用于删除字符串首尾的空格
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val

        console.log(key, val)
```

ps.只是处理了比较通用的情况，缺少考虑了极端情况。

2.使用 `express` 获取cookie 的方式

```js
app.use(cookieParser())
```

```
req.cookies
```

### 日志

1.野生实现

```
access(`${req.method} —— ${req.url} —— ${req.headers['user-agent']} —— ${Date.now()}`)
```

2.使用express实现

```js
var logger = require('morgan')
app.use(logger('dev'))
```

### get请求

1.野生实现

```
if (method === 'GET' && req.path === '/api/blog/detail') {
```

2.express实现

```
router.get('/',function(req,res,next){})
```

