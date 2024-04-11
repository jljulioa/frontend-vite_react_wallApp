import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://express-alb-1156644359.us-east-1.elb.amazonaws.com/api/',
    withCredentials: true,
})


export default axiosInstance