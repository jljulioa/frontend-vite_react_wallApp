import axios from "axios";


const axiosInstance = axios.create({
    baseURL: `http://express-backend-balancer-43295231.us-east-1.elb.amazonaws.com/api`,
    withCredentials: true
})


export default axiosInstance