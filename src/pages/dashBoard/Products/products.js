import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../website/Auth/context"
import { Link } from "react-router-dom"


export default function Products(){
    const [products , setProducts] = useState([])
    const [Run , setRun] = useState(0)

    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/product/show" , {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        .then((data) => {
            setProducts(data.data)})
        .catch(err => console.log(err))
    } , [Run])
    

    const showData = products.map((product , index) => {
        return (
            <div key={product.id} className="product">
                <img src={product.image}/>
                <h3>{product.title}</h3>
                <h6>{product.description}</h6>
                <div>
                    <Link to={`${product.id}`}>
                        <i style={{color: "green", fontSize: "30px" , margin: "10px", cursor: "pointer"}} 
                            className="fa-solid fa-pen-to-square">
                        </i>
                    </Link>
                    <i onClick={() => deleteProduct(product.id)}
                        style={{color: "red" , fontSize: "30px" , margin: "10px" , cursor: "pointer"}} 
                        className="fa-solid fa-trash">
                    </i>
                </div>
            </div>
        )
    })

    async function deleteProduct(id){
        try {const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}` , {
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
        <div className="products">
            {showData}
        </div>
    )
}