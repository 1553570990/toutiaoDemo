import axios from '../utils/axios.config.js'
import api from '../views/axios_path/api'
export function getMaterialData(params){
    return axios({
        url:api.MATERIAL_USER,
        params
    })
}