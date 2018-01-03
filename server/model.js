const mongoose = require('mongoose');
//链接数据库 并且使用mushroom这个集合（###即mysql的表概念?）
const DB_URL = 'mongodb://localhost:27017/recruit';
mongoose.connect(DB_URL, {
    useMongoClient: true
});
mongoose.connection.on('connected', function () {
    console.log('mongodb connect success');
})

mongoose.connection.on('error', function (error) {
    console.log("数据库连接失败：" + error);
}); 

const models = {
    user: {
        'name': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        //头像
        'avatar': { type: String },
        //简介
        'desc': { type: String },
        //职位
        'title': { type: String },
        //如果你是boss，还有两个字段
        'company': { type: String },
        'money': { type: String },
    },
    chat: {

    }
}

for(let m in models) {
    // console.log('process in action ...')
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}