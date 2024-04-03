import axios from "axios";
import { Api } from "kubernetes-client";

const api = new Api({apiVersion: 'v1'});

const service = await api.v1.namespaces('default').services('express-backend-service').get();


const axiosInstance = axios.create({
    
    baseURL: `http://${service.spec.clusterIP}:${service.spec.ports[0].port}`,
    withCredentials: true
})

export default axiosInstance