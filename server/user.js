const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const _filter = { pwd: 0, __v: 0 }

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

//判断Authroute跳转路由
Router.get('/info', function (req, res) {
    const {userid} = req.cookies
    if(!userid) {
        return res.json({code:1})
    }
    User.findOne({_id: userid}, _filter, function(err, doc){
        if(err) {
            return res.json({code:1, msg: '后端出错'})
        }
        if(doc) {
            return res.json({code:0, data:doc})
        }
    })
})

//删除所有用户
Router.get('/delete', function (req, res) {
    User.remove({}, function(err, doc){
        if(!err) {
            res.json(doc)
        } else {
            console.log(err)
        }
    })
})

Router.get('/list', function(req, res) {
    //###为什么这里没收到
    console.log('into list')
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})

function md5Pwd(pwd) {
    return utils.md5(utils.md5(pwd +'saltsaltsalt'))
}

Router.post('/register', function(req, res) {
    console.log('into register')
    console.log(req.body)
    const {name, pwd, type} = req.body
    User.findOne({ name: name }, _filter, function(err, doc){
        if(doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }

        const userModel = new User({ name, type, pwd: md5Pwd(pwd) })
        userModel.save(function(err, doc){
            if(err){
                return res.json({code:1, msg:'后端出现问题'})
            }
            const {name, type, _id} = doc
            res.cookie('userid', _id)

            return res.json({code:0, data:{name, type, _id}})
        })

        //省略的{name: name, ...} 可以直接写成{name, type, pwd}, 但是不省略的字段要放到最后面
        
    })
})

Router.post('/login', function(req, res) {
    const { name, pwd } = req.body
    User.findOne({ name, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
        if(!doc) return res.json({code: 1, msg: '用户名或密码错误！'})
        else {
            res.cookie('userid', doc._id)
            return res.json({code: 0, data: doc})
        }
    })
})

module.exports = Router