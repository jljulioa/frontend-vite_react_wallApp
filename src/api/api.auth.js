import axios from "./axios";



export const registerRequest = user => {
    return axios.post(`auth/register`, user)
}

export const loginRequest = user => {
    return axios.post(`auth/login`, user)
}

export const veryfyTokenRequest = () => {
    return axios.get(`auth/verify`)
}

export const logoutRequest = () => {
    return axios.post(`auth/logout`)
}