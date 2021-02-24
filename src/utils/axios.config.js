import axios from 'axios'
import {Message} from 'element-ui'
import router from '../permission.js'

axios.defaults.baseURL = 'http://localhost:3031'

//请求拦截器
axios.interceptors.request.use(function(config){
    const token = window.localStorage.getItem('user-token');
    config.headers.Authorization = `Bearer ${token}`;
    return config
}) 

// 响应拦截器
axios.interceptors.response.use(function(response){
    return response.data ? response.data : {}
},function(error){
    const status = error.response.status;
    let message = '';
    switch (status) {
        case 400:
            message = '请求参数错误'
            break
        case 403:
            message = "用户非实名认证,无授权登录"
            break
        case 507:
            message = "服务器或数据库异常"
            break
        case 404:
            message = "手机号错误"
            break
        case 401:
            message="token未传非法访问"
            window.localStorage.clear();
            router.push('/')
            break
        default:
            message = error.response.data.message
            break
    }
    Message({
        type:"warning",
        message
    })
    // 强行返回promise对象 表示错误已经处理完毕 将错误截至
    return new Promise(function(){})
})

export default axios