## Selfblog-NodeJS
个人博客（NodeJS版本）

Commonjs-test演示了简单的CommonJS模块引入规范

debugger-test演示了简单的VSCode的debug方式，包括断点调试等

httpReq-test演示了简单的HTTP服务，GET请求，POST请求的发送

blog演示了博客后端接口的编写。

## blog启动方式

```
npm install
npm run dev
```

### 端口号(bin\www.js文件)

浏览器输入(localhost:8000进入项目)

浏览器端口号 —— 8000

### mysql数据库

账号 —— root

密码 —— 123

## 接口列表

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

