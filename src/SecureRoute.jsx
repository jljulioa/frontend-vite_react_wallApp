import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

export default function SecureRoute() {
    const {isAuth, loading} = useAuth()
    console.log(isAuth)

     if (loading) {
        return console.log("loading...")
    }

    if (!loading && !isAuth) {
        return <Navigate to="/login" replace/>
    }  

    return (
        <Outlet/>
    )
}