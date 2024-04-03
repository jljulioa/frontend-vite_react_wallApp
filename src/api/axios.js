import axios from "axios";
import k8s from "@kubernetes/client-node";

const createAxiosInstance = async () => {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

    try{
        const service = await k8sApi.readNamespacedService('express-backend-service', 'default');
        const axiosInstance = axios.create({
            baseURL: `http://${service.spec.clusterIP}:${service.spec.ports[0].port}`,
            withCredentials: true
        });
        return axiosInstance;
    } catch (error) {
        console.log(error);
    } 
}

export default createAxiosInstance;
