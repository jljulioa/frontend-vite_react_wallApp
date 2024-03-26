import { getWall } from "../api/api.wall"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { wallDelete } from "../api/api.wall"
export default function Dashboard() {

    const [wall, setWall] = useState([])
    const [loading, setLoading] = useState(false)
    const [fileDelete, SetFileDelete] = useState()
    const [error, setError] = useState([])
    const { user } = useAuth()


    useEffect(() => {

        try {
            getWall().then(res => {
                setWall(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    
    }, [user, loading])

    const handleDelete = async (key) => {
        SetFileDelete(key)
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
        <div className="w-full mt-20 flex flex-col justify-center items-center text-slate-200">
            <div className="mx-auto max-w-sm flex justify-center items-center my-5">
                <h1 className="text-3xl font-bold page-title">Dashboard!</h1>
            </div>
            <div className="p-5 sm:p-8 ">     
                <div className={`w-full columns-1 gap-5 sm:gap-8 ${wall.length >= 2 ? 'sm:columns-2': ''} ${wall.length >= 3 ? 'md:columns-3': ''}  ${wall.length > 7 ? 'lg:columns-4': ''} [&>img:not(:first-child)]:mt-8`} id={``}>
                    {wall.map((key, i) => 
                    <a className="relative ring-1 ring-[#7d17bc] group grid max-w-lg w-auto max-h-sm overflow-hidden rounded mb-5" href={key.uploadSignedUrl} key={i} target="_blank" rel="noreferrer">
                        <img className=" w-full h-auto hover:scale-105 transition duration-200" loading="lazy" key={i} src={key.thumabnailSignedUrl}/>
                        <button onClick={(e) => {e.preventDefault(); handleDelete(key.key)}} className="absolute right-5 top-5 p-1 bg-red-500 rounded text-lg hidden group-hover:block">
                            <img className="w-6" src="./src/assets/trash.svg" alt="delete" />
                        </button>
                        {loading && key.key === fileDelete &&
                        <div id={key.key} className="absolute flex items-center justify-center w-full h-full">
                            <div role="status">
                                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}
                        {error && <p className="text-red-500">{error}</p>}
                    </a>
                    )}
                    
                </div>
            </div>
        </div>
    )
}