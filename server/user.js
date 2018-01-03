const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

// //新增数据
// User.create({
//     name: 'chaz',
//     age: 25
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })
Router.get('/info', function (req, res) {
    //###浏览器访问这里也没有触发
    console.log('into info')
    return res.json({ code: 0 })
})

Router.get('/list', function(req, res) {
    //###为什么这里没收到
    console.log('into list')
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})
Router.post('/register', function(req, res) {
    console.log('into register')
    console.log(req.body)
    const {name, pwd, type} = req.body
    User.findOne({name: name}, function(err, doc){
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        User.create({name, pwd, type}, function(err, doc){
            if(err) {
                return res.json({code:1, msg: '后端出现问题'})
            }
            //注册成功
            // console.log('注册成功')
            return res.json({code: 0})
        })
    })
})


module.exports = Router