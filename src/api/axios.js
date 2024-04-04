import axios from "axios";


const axiosInstance = axios.create({
    baseURL: `http://express-backend.default.svc.cluster.local:8080/api`,
    withCredentials: true
})


export default axiosInstance