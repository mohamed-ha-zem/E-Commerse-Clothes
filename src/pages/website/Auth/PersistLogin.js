import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "./context"
import Cookies from "universal-cookie"
import Loading from "../../../component/loading"
import { Outlet } from "react-router-dom"

export default function PersistLogin(){
    const [loading , setLoading] = useState(true)
    const cookie = new Cookies() 
    const getToken = cookie.get("Bearer")
    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        async function refresh (){
            if (!getToken) {
                setLoading(false);
                return;
            }
            try{
            const res = await axios.post(`http://127.0.0.1:8000/api/refresh` , null , {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            })
            if(!res.data.token || !res.data.user){
                setLoading(false);
                return;
            }
            cookie.set("Bearer" , res.data.token)
            context.setAuth({token: res.data.token , userDetails: res.data.user})
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        !token ? refresh() : setLoading(false)
    } , [])
    return  loading ? <Loading/> : <Outlet/>
}