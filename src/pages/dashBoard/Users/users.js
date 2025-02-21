import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../website/Auth/context"
import { Link } from "react-router-dom"

export default function Users(){
    const [userss , setUsers] = useState([])
    const [Run , setRun] = useState(0)

    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/show" , {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then((data) => {
            setUsers(data.data)})
        .catch(err => console.log(err))
    } , [Run])
    

    const showData = userss.map((user , index) => {
        return (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`${user.id}`}>
                        <i style={{color: "green", fontSize: "30px" , margin: "10px", cursor: "pointer"}} 
                            className="fa-solid fa-pen-to-square">
                        </i>
                    </Link>
                    <i onClick={() => deleteUser(user.id)}
                        style={{color: "red" , fontSize: "30px" , margin: "10px" , cursor: "pointer"}} 
                        className="fa-solid fa-trash">
                    </i>
                </td>
            </tr>
        )
    })

    async function deleteUser(id){
        try {const res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            setRun((prev) => prev + 1)
        }
        }catch (error){
            console.log(error)
        }   
    }

    return (
        <div style={{padding: "20px"}}>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showData}
                </tbody>
            </table>
        </div>
    )
}