import axios from "axios";
import k8s from "@kubernetes/client-node";

const createAxiosInstance = async () => {
    const api = new k8s.CoreV1Api();
    const service = await api.v1.namespaces('default').services('express-backend-service').get();
    const axiosInstance = axios.create({
        baseURL: `http://${service.spec.clusterIP}:${service.spec.ports[0].port}`,
        withCredentials: true
    });
    return axiosInstance;
}

export default createAxiosInstance;
