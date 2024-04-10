import { useEffect } from "react"
import { helloServer } from "../api/api.auth"
export default function Homepage() {
    console.log(import.meta.env.VITE_API_URL)
    console.log(import.meta.env)

    useEffect(() => {
       helloServer().then((res) => console.log(res))
    }, [])

    useEffect(() => {
        fetch('http://express-backend-service.default.svc.cluster.local/api/auth').then((res) => console.log(res))
    })
    return (
        <div className=" w-full my-32 flex flex-col justify-center items-center text-slate-200 App">
            {/* <div className="btn rounded-xl" type="button">
                <strong className="md:text-9xl text-5xl px-10 py-5 font-bold">Wellcome</strong>
                <div id="container-stars">
                    <div id="stars"></div>
                </div>
                <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
            <div className="container h-[600px]">
                <div className="palette">
                    <div className="color"><span>264653</span></div>
                    <div className="color"><span>2A9D8F</span></div>
                    <div className="color"><span>E9C46A</span></div>
                    <div className="color"><span>F4A261</span></div>
                    <div className="color"><span>E76F51</span></div>
                </div>
            </div> */}
            <div className="wellcome text-7xl md:text-[13rem]">Wellcome</div>
        </div>
    )
}