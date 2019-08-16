## Selfblog-NodeJS
个人博客（NodeJS版本）

Commonjs-test演示了简单的CommonJS模块引入规范

debugger-test演示了简单的VSCode的debug方式，包括断点调试等

httpReq-test演示了简单的HTTP服务，GET请求，POST请求的发送

blog演示了博客后端接口的编写。

## 启动方式

```
npm install
npm run dev
```

### 端口号(bin\www.js文件)

```
8000
```

浏览器输入(localhost:8000进入项目)

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



### 