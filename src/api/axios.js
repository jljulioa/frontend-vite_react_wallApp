import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://54.211.21.161:32345/api/',
    withCredentials: true,
    headers: {
        'acess-control-allow-origin': '*'
    }
})


export default axiosInstance