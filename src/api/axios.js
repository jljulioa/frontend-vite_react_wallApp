import axios from "axios";
import {k8s} from "@kubernetes/client-node";


const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const service = await k8sApi.readNamespacedService('express-backend-service', 'default')

const axiosInstance = axios.create({
    
    baseURL: `http://${service.spec.clusterIP}:${service.spec.ports[0].port}`,
    withCredentials: true
})

export default axiosInstance