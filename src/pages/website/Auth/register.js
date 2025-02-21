import { use, useContext, useState } from "react"
import axios from 'axios';
import { User } from "./context";
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";


export default function Register(){
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword]= useState("") 
    const [passwordR , setPasswordR] = useState("")
    const [accept , setAccept] = useState(false)
    const [emailError , setEmailError] = useState(false)

    const nav = useNavigate()

    const user = useContext(User)

    const cookie = new Cookies()

    async function Submit(e){
        e.preventDefault() // stop the natural events
        setAccept(true) // to not see the error message before enter Register

        try {const res = await axios.post("http://127.0.0.1:8000/api/register" , { // send the data 
            name: name,
            email: email, 
            password: password, 
            password_confirmation: passwordR
        })
        console.log(res.data.data)
        const token = res.data.data.token
        const date = new Date();
        date.setDate(date.getDate() + 7);
        cookie.set("Bearer", token, { expires: date, secure: true, sameSite: "Strict" });
        const userDetails = res.data.data.user
        user.setAuth({token , userDetails})
        nav("/dashBoard")

        }catch (error) {
            if (error.response.status === 422) {
                setEmailError(true)
            }else {
                // مشكلة في تكوين الطلب
                console.error('Error message:', error.message);
            }
        }
    }

    return(
        <div className="signUp">
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
                {name.length < 2 && accept && <p className="error">The name is very Short</p>}
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                {emailError && accept && <p className="error">Email has been taken</p>}
                <label htmlFor="password">PassWord:</label>
                <input type="text" id="password" placeholder="PassWord..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                {password.length < 8 && accept && <p className="error">password must be more than 8 char</p>}
                <label htmlFor="passwordR">Repeat PassWord:</label>
                <input type="text" id="passwordR" placeholder="Repeat PassWord..." value={passwordR} onChange={(e) => setPasswordR(e.target.value)}/>
                {passwordR !== password && accept && <p className="error">must be PassWord Repeat = password</p>}
                <button className="button" onClick={Submit}>Register</button>
            </form>
        </div>
    )
}