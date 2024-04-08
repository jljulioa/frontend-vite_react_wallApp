import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'express-backend-service.default.svc.cluster.local/api',
    withCredentials: true
})


export default axiosInstance