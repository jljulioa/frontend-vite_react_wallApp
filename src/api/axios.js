import axios from "axios";


const axiosInstance = axios.create({
    baseURL: `http://internal-express-backend-balancer-1091790852.us-east-1.elb.amazonaws.com/api`,
    withCredentials: true
})


export default axiosInstance