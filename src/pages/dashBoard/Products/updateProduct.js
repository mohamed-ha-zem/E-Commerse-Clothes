import { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { User } from "../../website/Auth/context";


export default function UpdateProduct(){
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const [image , setImage]= useState("") 
    const [accept , setAccept] = useState(false)

    const nav = useNavigate()

    const user = useContext(User)
    const token = user.auth.token
    const id = window.location.pathname.split("/").slice(-1)[0]

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/showbyid/${id}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setTitle(data[0].title)
            setDescription(data[0].description)
        })
    } , [])

    async function Submit(e){
        e.preventDefault() // stop the natural events
        setAccept(true) // to not see the error message before enter Register

        const formData = new FormData()
        formData.append("title" , title)
        formData.append("description" , description)
        formData.append("image" , image )

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}` , // send the data 
            formData
        , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        nav("/dashBoard/products")
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
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                {title.length < 2 && accept && <p className="error">The name is very Short</p>}
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                {}
                <label htmlFor="image">image:</label>
                <input type="file" id="image" placeholder="Image..." onChange={(e) => setImage(e.target.files.item(0))}/>
                <button className="button" onClick={Submit}>Update User</button>
            </form>
        </div>
    )
}