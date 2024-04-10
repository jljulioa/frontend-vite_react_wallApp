import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://express-backend-service:80/api/',
    withCredentials: true
})


export default axiosInstance