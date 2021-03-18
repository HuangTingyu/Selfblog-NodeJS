var express = require('express')
var router = express.Router()
const https = require('https')
const fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/crawler', () => {
  https.get('https://movie.douban.com/top250',(res)=>{
    // 分段返回的 自己拼接
    let html = ''
    // 有数据产生的时候 拼接
    res.on('data',(chunk)=>{
        html += chunk
    })
    // 拼接完成
    res.on('end',function(){
      fs.writeFile('../assets/test.json', JSON.stringify(html), (err) => {
        if(!err){
            res.sends('文件写入完毕')
        }
      })
    })
  })

})

module.exports = router
