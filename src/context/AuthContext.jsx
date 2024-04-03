import { createContext, useState, useContext, useEffect } from "react"
import { registerRequest, loginRequest, veryfyTokenRequest, logoutRequest } from "../api/api.auth";
import PropTypes from 'prop-types'; 
import Cookies from "js-cookie";
import { profileUpload } from "../api/api.wall";
import { k8s } from "@kubernetes/client-node";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editprofile, setEditProfile] = useState(null);
    const [service, setService] = useState(null);

    const signin = async (data) => {
        try {
        await loginRequest(data).then((res) => {
            setUser(res.data)
            setIsAuth(true)
        })} catch (error) {
            console.log(error)
            setError(error.response.data.message)
            setIsAuth(false)
            setUser(null)
            console.log(error.response.data.message)
        }
    }

    const signup = async (data) => {
        try {console.log(data)
        await registerRequest(data).then((res) => {
            setUser(res.data)
            setIsAuth(true)
        })} catch (error) {
            console.log(error)
            setError(error.response.data.message)
            setIsAuth(false)
            setUser(null)
            console.log(error.response.data.message)
        }
    }

    const logout = async () => {
        await logoutRequest()
        Cookies.remove("token")
        setIsAuth(false)
        setUser(null)
    }

    const changeProfilePic = async (data) => {
        try {console.log(data)
            await profileUpload(data).then((res) => {
                setEditProfile(res)
            })
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }


    useEffect(() => {
        if (error.length > 0) {
           const timer = setTimeout(() => {
                setError([])
            }, 5000) 
            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
        const fetchServiceIP = async () => {
            try {
                const kc = new k8s.KubeConfig();
                kc.loadFromDefault();
        
                const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
        
                const serviceData = await k8sApi.readNamespacedService('express-backend-service', 'default');
                const apiIp = serviceData.body.spec.clusterIP;

                console.log(apiIp)
        
                setService(apiIp);
            } catch (error) {
                console.error("Error retrieving service details:", error);
                throw error; // Throw the error to indicate failure
            }
        };

        fetchServiceIP();
    }, []);

    useEffect(() => {

        const cookies = Cookies.get()

        console.log(cookies)
        function checkLogin() {
            if(!cookies.token) {
                setLoading(false)
                return
            }

            if (cookies.token) {
                veryfyTokenRequest(cookies.token).then((res) => {
                    setUser(res.data)
                    setIsAuth(true)
                    setLoading(false)
                }).catch((error) => {
                    setIsAuth(false)
                    setUser(null)
                    console.log(error)
                    setLoading(false)
                })
             }
        }

        checkLogin()
        
    }, [editprofile])

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            changeProfilePic,
            loading,
            user,
            isAuth,
            error,
            service
        }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node 
}