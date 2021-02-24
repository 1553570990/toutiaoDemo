import axios from "../utils/axios.config.js"
import api from '../views/axios_path/api.js'
export  function getUserInfo_axios(){
    return axios({
        url:api.HOME_GETINFO,
        method:'get',
    })
}