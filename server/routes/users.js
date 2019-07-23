var express = require('express');
var router = express.Router();
var db = require('../db.js')
var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 登录
router.get('/login', function (req, res, next) {
    var obj = req.query;
    db.query('select * from tour_user where user_phone=' + obj.username + '', function (err, rows, fields) {
        if (rows.length == 0) {
            res.send({
                result: 'success',
                msg: '用户不存在',
                status: false
            })
        } else {
            if (rows[0].user_pwd == obj.password) {
                res.send({
                    result: 'success',
                    status: true
                })
            } else {
                res.send({
                    result: 'success',
                    status: false,
                    msg: '密码错误',
                })
            }
        }
    });
})

// 获取用户列表
router.get('/getuser',function (req, res, next) {
    db.query('select id,user_name,user_phone,user_sex,user_status from tour_user', function (err, rows, fields) {
        res.send({
            result: 'success',
            userarray: rows,
            msg: '查询成功'
        })
    })
})
// 删除用户
router.get('/deluser', function (req, res, next) {
    var id = req.query.id
    var status=req.query.status==1?0:1
    db.query('update tour_user set user_status='+status+'  where id=' + id + '', function (err, rows, fields) {
        if (err == null) {
            res.send({
                result: 'success',
                msg: '操作成功'
            })
        } else {
            res.send({
                msg: err
            })
        }
    })
})
// 修改用户
router.post('/changeuser',jsonParser, function (req, res, next) {
    var obj = req.body
    obj.sex=Number(obj.sex)
    db.query('update tour_user set user_name="'+obj.name+'" ,user_sex='+obj.sex+' where id=' + obj.id + '', function (err, rows, fields) {
        if (err == null) {
            res.send({
                result: 'success',
                msg: '操作成功'
            })
        } else {
            res.send({
                result:'fail'
            })
        }
    })
})

// 模糊查找
router.post('/searchuser',jsonParser,function(req,res,next){
    var obj=req.body;
    var sql='select id,user_name,user_phone,user_sex,user_status from tour_user where '
    if(obj.name!=''){
        sql=sql+'user_name like "%'+obj.name+'%"'
    }
    if(obj.username!=''&&obj.name!=''){
        sql=sql+' and user_phone like "'+obj.username+'%"'        
    }else if(obj.username!=''){
        sql=sql+'user_phone like "'+obj.username+'%"'        
    }

    if(obj.sex!=''&&obj.username!=''||obj.sex!=''&&obj.name!=''){
        sql=sql+' and user_sex='+Number(obj.sex)+''        
    }else if(obj.sex!=''){
        sql=sql+'user_sex='+Number(obj.sex)+''        
    }

    db.query(sql, function (err, rows, fields) {
        res.send({
            result: 'success',
            userarray: rows,
            msg: '查询成功'
        })
    })
})

module.exports = router;
