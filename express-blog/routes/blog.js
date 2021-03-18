var express = require('express')
var router = express.Router()
var request = require('request')

router.get('/list',function(req,res,next){
    res.json({
        errno:0,
        data:'list'
    })
})

router.get('/detail',function(req,res,next){
    request.get('http://wwitil.oa.com/datacenter/cgi-bin/wework_mng_newtapd.py?cmd=6004&itid=1010121621001204723', function(error, response, body){
        res.json({response})
        // console.log(response && response.statusCode)
        // console.log(response)
    })
    // res.json({
    //     errno:0,
    //     data:'detail'
    // })
})

module.exports = router