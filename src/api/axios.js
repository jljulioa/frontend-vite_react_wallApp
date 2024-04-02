import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://10.100.155.151:8080/api',
    withCredentials: true
})

export default axiosInstance