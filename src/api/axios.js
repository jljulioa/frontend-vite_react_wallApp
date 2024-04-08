import axios from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://express-backend-service.default.svc.cluster.local/api',
    withCredentials: true
})


export default axiosInstance