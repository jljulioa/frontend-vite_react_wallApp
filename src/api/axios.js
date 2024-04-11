import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://54.204.67.62:31321/api/',
    withCredentials: true,
})


export default axiosInstance