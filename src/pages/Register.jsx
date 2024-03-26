import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Register(){
    const {signup, user, isAuth, error: authError} = useAuth()

    console.log(user)

    useEffect(() => {
        if (isAuth) {
            window.location.href = "/profile"
        }
    }, [isAuth])


    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = handleSubmit(async(data) => await signup(data))

    return (
    <div className="my-32 flex mx-auto max-w-7xl justify-center items-center text-slate-200 App">
        <div className="w-full flex flex-col md:flex-row justify-center items-center">
            <h1 className="text-3xl font-bold w-auto mx-auto text-center mb-5">register!</h1>
            <form onSubmit={onSubmit} className="w-full max-w-xs mx-auto">
            {authError.map((err, i) => <p className="bg-red-500 rounded-lg px-2 text-white mb-5" key={i}>{err}</p>)}
                <div className="mb-5">
                    <label htmlFor="username" className="block mb-2 text-sm font-medium ">Your name</label>   
                    <input type="text" {...register("username", {required: true})} id="usernname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="username"/> 
                    {errors.username && <p className="text-red-500">Username field is required</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium ">Your email</label>
                    <input type="email" {...register("email", {required: true})} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com"/>
                    {errors.email && <p className="text-red-500">Email field is required</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium ">Your password</label>
                    <input type="password" {...register("password", {required: true})} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
                    {errors.password && <p className="text-red-500">Password field is required</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium ">Confirm password</label>
                    <input type="Password" {...register("confirmPassword", {required: true})} id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                    {errors.confirmPassword && <p className="text-red-500">Confirm password field is required</p>}
                </div>
                <button type="submit" className="text-white  bg-[#7d17bc] hover:bg-[#5c2480] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                <p className="text-gray-500 text-lg mt-3">Already have an account?{" "} <Link to="/login" className="text-sky-400 hover:underline">Sign in</Link>.</p>
            </form>
        </div>
    </div>
    )
}