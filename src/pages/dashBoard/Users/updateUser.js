import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Auth/context";


export default function UpdateUser(){
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword]= useState("") 
    const [passwordR , setPasswordR] = useState("")
    const [accept , setAccept] = useState(false)

    const nav = useNavigate()

    const user = useContext(User)
    const token = user.auth.token
    const id = window.location.pathname.split("/").slice(-1)[0]

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setName(data[0].name)
            setEmail(data[0].email)
        })
    } , [])

    async function Submit(e){
        e.preventDefault() // stop the natural events
        setAccept(true) // to not see the error message before enter Register

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}` , { // send the data 
            name: name,
            email: email, 
            password: password, 
            password_confirmation: passwordR
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        nav("/dashBoard/users")
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}/>
                {name.length < 2 && accept && <p className="error">The name is very Short</p>}
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
                {}
                <label htmlFor="password">PassWord:</label>
                <input type="text" id="password" placeholder="PassWord..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                {password.length < 8 && accept && <p className="error">password must be more than 8 char</p>}
                <label htmlFor="passwordR">Repeat PassWord:</label>
                <input type="text" id="passwordR" placeholder="Repeat PassWord..." value={passwordR} onChange={(e) => setPasswordR(e.target.value)}/>
                {passwordR !== password && accept && <p className="error">must be PassWord Repeat = password</p>}
                <button className="button" onClick={Submit}>Update User</button>
            </form>
        </div>
    )
}