import { createContext, useContext } from "react";
import { wallDelete, getWall } from "../api/api.wall";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types'; 

const WallContext = createContext();

export const useWall = () => {
    const context = useContext(WallContext);
    if (context === undefined) {
        throw new Error("useWall must be used within a WallProvider")
    }
    return context
}

export function WallProvider({children}) {
    const [wall, setWall] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])

    const getWallUrls = async () => {
        try {
            const res = await getWall()
            setWall(res.data)
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }

    const deleteWall = async (key) => {
        setLoading(true)
        console.log(key)
        try {
            const res = await wallDelete(key)
            setLoading(false)
            console.log(res)
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

    return (
        <WallContext.Provider value={{
            deleteWall,
            getWallUrls,
            loading,
            error,
            wall
        }}>
            {children}
        </WallContext.Provider>
            
    )
}

WallProvider.propTypes = {
    children: PropTypes.node 
}