import { useContext, useState } from "react"
import axios from 'axios';
import { User } from "./context";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [email , setEmail] = useState("")
    const [password , setPassword]= useState("") 
    const [accept , setAccept] = useState(false)
    const nav = useNavigate()
    const user = useContext(User)

    const cookie = new Cookies()

    async function Submit(e){
        e.preventDefault() // stop the natural events
        setAccept(true) // to not see the error message before enter Register

        try {const res = await axios.post("http://127.0.0.1:8000/api/login" , { // send the data 
            email: email, 
            password: password, 
        })
        console.log(res.data.data)
        const token = res.data.data.token
        const userDetails = res.data.data.user
        user.setAuth({token , userDetails})
        cookie.remove("Bearer"); // امسح التوكن القديم

        const date = new Date();
        date.setDate(date.getDate() + 7);
        cookie.set("Bearer", token, { expires: date, secure: true, sameSite: "Strict" });
        nav("/dashBoard")

        }catch (error) {
            if (error.response) {
                // الرد جاء من الخادم (مثلاً، خطأ 400 أو 500)
                console.error('Error response:', error.response.data);
                console.error('Status:', error.response.status);
            } else if (error.request) {
                // لم يتم الرد من الخادم
                console.error('Error request:', error.request);
            } else {
                // مشكلة في تكوين الطلب
                console.error('Error message:', error.message);
            }
        }
    }

    return(
        <div className="signUp">
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                {}
                <label htmlFor="password">PassWord:</label>
                <input type="text" id="password" placeholder="PassWord..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                {password.length < 8 && accept && <p className="error">password must be more than 8 char</p>}
                <button className="button" onClick={Submit}>Login</button>
            </form>
        </div>
    )
}