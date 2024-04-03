import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://10.100.127.166/api`,
    withCredentials: true
})

export default axiosInstance