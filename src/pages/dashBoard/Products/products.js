import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../website/Auth/context"
import { Link, useNavigate } from "react-router-dom"


export default function Products(){
    const [products , setProducts] = useState([])
    const [Run , setRun] = useState(0)
    const nav = useNavigate()

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
        .catch(err =>{
            alert("go to the Login Page or Rigester Page")
            console.log(err)
            if(err.status === 401){
                nav("/login")
            }
        })
    } , [Run])
    

    const showData = products.map((product) => {
        return (
            <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                    <img onClick={bigImage} src={product.image} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "cover" , cursor: "pointer"}} />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <div className="d-flex justify-content-between">
                            <Link to={`${product.id}`} className="btn btn-success">
                                <i className="fa-solid fa-pen-to-square"></i> تعديل
                            </Link>
                            <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">
                                <i className="fa-solid fa-trash"></i> حذف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
    
    function bigImage(e) {
        const img = e.target;
        
        // لو الصورة مكبرة، رجّعها لحجمها الطبيعي
        if (img.classList.contains("zoomed")) {
            img.classList.remove("zoomed");
            img.style.cssText = `
            height: 200px;
            object-fit: cover;
            cursor: pointer;
            `;
        } else {
            // احصل على حجم الشاشة
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
    
            // خلي الصورة ثابتة في المنتصف
            img.classList.add("zoomed");
            img.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 700px;
                max-width: 90%;
                max-height: 90%;
                z-index: 1000;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                border-radius: 10px;
                cursor: pointer;
            `;
        }
    }
    

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
        <div className="container mt-4">
            <div className="row">
                {showData}
            </div>
        </div>
    );
    
}