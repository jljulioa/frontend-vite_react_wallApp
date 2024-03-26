import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const {signin, user, isAuth, error: signinError} = useAuth()
    const {handleSubmit, register, formState: {errors}} = useForm()

    console.log(user)
    console.log(isAuth)

    const onSubmit = handleSubmit(async(data) => {
        await signin(data)
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate("/dashboard")
        }
    }, [isAuth, navigate]) 

    return (
    <div className="my-32  w-full flex flex-col justify-center items-center  text-slate-200 App">
         <div className="mx-auto max-w-sm flex justify-center items-center my-5">
         <h1 className="text-3xl font-bold">login!</h1>
        </div>
        <form onSubmit={onSubmit} className="w-full max-w-xs mx-auto">
            {signinError.map((err, i) => <p className="bg-red-500 rounded-lg px-2 text-white mb-5" key={i}>{err}</p>)}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                <input type="email" {...register("email", {required: true})} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7d17bc] focus:border-blue-500 block w-full p-2.5 " placeholder="email@wallpaper.com" required />
                {errors.email && <p className="text-red-500">Email field is required</p>}
                </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium ">Your password</label>
                <input type="password" {...register("password", {required: true})} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#7d17bc] focus:border-blue-500 block w-full p-2.5 " required />
                {errors.password && <p className="text-red-500">Password field is required</p>}
            </div>
            <button type="submit" className="text-white bg-[#7d17bc] hover:bg-[#5c2480] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            <p className="text-gray-500 text-lg mt-3">Don`t have an account?{" "} <Link to="/register" className="text-sky-400 hover:underline">Sign up</Link>.</p>
        </form>
    </div>
    )
}