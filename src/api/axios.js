import axios from "axios";


const axiosInstance = axios.create({
    baseURL: ':32345/api/',
    withCredentials: true
})


export default axiosInstance