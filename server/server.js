

const userRouter = require('./user') 

const express = require('express');

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 9093;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
// 这两句会引起跨域问题
// Proxy error: Could not proxy request / user / info from localhost: 3000 to http://localhost:9093/.
// See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
// Provisional headers are shown


//链接子路由
app.use('/user', userRouter)

app.listen(port, function(){
    console.log(`express server start at port ${port}`);
})