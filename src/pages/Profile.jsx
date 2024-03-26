import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { Label, FileInput } from "flowbite-react"



export default function Profile() {
    const { user , changeProfilePic, error: errorProfile } = useAuth()
    const [avatar, setAvatar] = useState()
    const [profilePreview, setProfilePreview] = useState()
    const [loading, setLoading] = useState(false)



    console.log(user)
    console.log(errorProfile)
    console.log(profilePreview)
    console.log(avatar)


    useEffect(() => {
        if (user || errorProfile.length > 0) {
            setProfilePreview(null)
        }
    }, [user, errorProfile])

    const avatarFile = e => {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0])
            setProfilePreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const onsubmit = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("avatar", avatar);
            await changeProfilePic(formData)
            setLoading(false)
            setAvatar(null)
        } catch {
            setLoading(false)
            setAvatar(null)
 
        }
    }


    return (
        <div className="w-full mx-auto rounded-lg my-16 flex flex-col justify-center items-center text-slate-200">
            <div className="flex flex-col justify-center items-center shadow-2xl rounded-lg px-6 md:px-12 py-16 bg-[#621c93]  md:ring-1 ring-[#7d17bc] shadow-[#7d17bc]">
            <h1 className="mx-auto text-3xl font-bold mb-8 page-title">Avatar</h1>
            {errorProfile && <span className="absolute text-red-500 top-20 animate-bounce duration-300 text-3xl">{errorProfile}</span>}
            <Label htmlFor="dropzone-file" className="relative group flex flex-col w-80 mx-auto items-center justify-center rounded-full ">
                {loading?(
                    <div className="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>  ):(
                    <svg className="absolute opacity-0 group-hover:opacity-75 w-2/3 text-slate-200 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    )}
                <img src={profilePreview || user.profilePic.url300 || "./src/assets/user.svg"} alt="" className="ring-2 ring-[#7d17bc] shadow-lg shadow-[#240a34] w-full cursor-pointer aspect-square rounded-full object-cover" />
                    <FileInput
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={avatarFile}
                    />
                
            </Label>
            {profilePreview &&
            <button className="submit group mt-6 bg-green-500 hover:bg-green-700 ring-1 ring-green-300 hover:ring-green-500" onClick={onsubmit}>
                <div className="submit-sign">
                    <svg className="group-hover:rotate-[-90deg] transition-all duration-300" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
                </div>
                <div className="submit-text">Submit</div>
            </button>}
            <div className="text-3xl text-center font-bold mt-5">
                    <p className="italic mb-4">username:</p>
                    {/* <p className="">email: {user.email}</p> */}
                    <div className="container-username">
                        <span className="span-btn"> </span>
                        <label className="neon-btn">
                            <span className="span-user"></span>
                            <span className="txt-user">{user.username}</span>
                        </label>
                    </div>
            </div>
            </div>
        </div>
    )
}