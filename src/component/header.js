import { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../pages/website/Auth/context";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Header(){

    const context = useContext(User)
    const token = context.auth.token

    const cookie = new Cookies()

    async function handleLogout(){
        await axios.post("http://127.0.0.1:8000/api/logout" , null , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        cookie.remove("Bearer")
        window.location.pathname = "/"
    }

    return(
        <div className="container">
            <div className="parent">
                <div style={{margin:"30px"}}>
                    <Link to="/home" className="button">Home</Link>
                    <Link to="/about" className="button">About</Link>
                </div>
                <div className="register-buttons d-flex">
                    {!token ?
                    <div>
                        <Link to="/register" className="button d-flex">Register</Link>
                        <Link to="/login" className="button d-flex">Login</Link>
                    </div>
                    :
                    <div>
                        <Link to="/dashBoard" className="button d-flex">DashBoard</Link>
                        <Link to="" className="button d-flex" onClick={handleLogout}>Logout</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}