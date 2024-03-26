import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { FileInput, Label } from 'flowbite-react';
import { wallUpload } from "../api/api.wall";


export default function UploadWall() {

    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const [wallUP, setWallUP] = useState(null)
    const [wallPreview, setWallPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])
    const [popUP, setPopUP] = useState(false)

    const wallFile = e => {
        if (e.target.files[0]) {
            setWallUP(e.target.files[0])
            setWallPreview(URL.createObjectURL(e.target.files[0]))
            console.log(e.target.files[0])
        }
    }

    useEffect(() => {
        if (popUP) {
            const timer = setTimeout(() => {
                setPopUP(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
        if (error.length > 0) {
            const timer = setTimeout(() => {
                setError([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [error, popUP])

    const onsubmit = async () => {
        if (!wallUP) return;
        const formData = new FormData();
        formData.append("image", wallUP);
        setLoading(true)

        try {
            const res = await wallUpload(formData)
            setLoading(false)
            setWallPreview(null)
            setWallUP(null)
            setPopUP(true)
            console.log(res)
        } catch (error) {
                setError(error.response.data.message)
                setLoading(false)
                setPopUP(null)
                setWallPreview(null)
                console.error('Error uploading file:', error);
            }
     }

     const wallClear = () => {
        setWallUP(null)
        setWallPreview(null)
     }

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [isAuth, navigate])

    return (
        <div className="mx-auto my-40 flex flex-col justify-center items-center text-slate-200">
            {popUP &&
            <span className="absolute top-40 animate-bounce duration-300 text-3xl">Succsesfully Upload</span>
            }
            {error && <span className="absolute top-40 animate-bounce duration-300 text-3xl">{error}</span>}
            <h1 className="text-5xl font-bold mb-12 text-center page-title">Upload Wallpaper</h1>
            <div className="flex flex-col rounded-lg py-10 md:px-16 items-center justify-center md:shadow-2xl md:bg-[#621c93] md:ring-1 md:ring-[#7d17bc] md:shadow-[#7d17bc]">
                <Label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex w-96 h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2  border-gray-300 bg-gray-50 hover:bg-gray-100 "
                >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    { !wallPreview ? (
                    <> <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400 animate-bounce"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 5MB)</p></>):(<span className="text-xs my-2 text-gray-500 dark:text-gray-400">{wallUP.name} - {((wallUP.size / 1000000).toFixed(2))}Mb</span>)}
                    {loading && 
                    <div className="absolute flex items-center justify-center w-56 h-56">
                        <div role="status">
                            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}
                    <img src={wallPreview} className="max-h-56 px-4 pb-4" alt="" />
                </div>
                <FileInput id="dropzone-file" className="hidden" accept="image/*" onChange={wallFile} />
                </Label>
                {wallPreview && 
                <div className="flex mt-8">
                    <button className="mx-2  px-4 py-2 bg-green-500 hover:bg-green-700 ring-1 hover:ring-2 ring-green-300 hover:ring-green-500 rounded-lg transition duration-200 font-semibold hover:font-bold " onClick={onsubmit}>Upload</button>
                    <button className="mx-2  px-4 py-2 bg-yellow-500 hover:bg-yellow-700 ring-1 hover:ring-2 ring-yellow-300 hover:ring-yellow-500 rounded-lg transition duration-200 font-semibold hover:font-bold " onClick={wallClear}>Clear</button>
                </div>
                }
            </div>
        </div>  
    )
}