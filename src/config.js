import axios from 'axios'
import {Toast} from 'antd-mobile'

//拦截请求
axios.interceptors.request.use((config)=>{
    Toast.loading('加载响应中', 0)
    // console.log(config)
    return config
})

//拦截响应
axios.interceptors.response.use((config) => {
    Toast.hide()
    return config
})


// Proxy error: Could not proxy request / user / info from localhost: 3000 to http://localhost:9093/.
// See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).

//  Proxy error: Could not proxy request / user / info from localhost: 3000 to http://localhost:9093/.
//  See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).

//hosts文件里面有一条0,0,0,0 localhost
//目测不是上述原因，测试过了