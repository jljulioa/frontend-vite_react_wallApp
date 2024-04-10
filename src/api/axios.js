import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://express-backend-service:3030/api/',
    withCredentials: true
})


export default axiosInstance