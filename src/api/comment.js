import axios from '../utils/axios.config.js'
import api from '../views/axios_path/api'
export function getComments_axios(params){
    return axios({
        url:api.COMMENT_GETDATA,
        method:'get',
        params
    })
}
export function openOrClose_comment(params,data){
    return axios({
        url:api.COMMENT_STATUS,
        method:'put',
        params,data
    })
}