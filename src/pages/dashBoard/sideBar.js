import { NavLink } from "react-router-dom";

export default function SideBar(){

    return (
        <div>
            <div className="user" > 
            {/* الشرط ده بيسئله هل هو موجود في الصفحه ده ؟ لو اه يبقي حط كلاس الأكتيف غير كده شيله */}
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/dashBoard/users" ><i className="fa-solid fa-users"></i>Users</NavLink> 
            </div>
            <div className="user">
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/dashBoard/user/create"><i className="fa-solid fa-user-plus"></i>new Users</NavLink>
            </div>
            <div className="user">
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/dashBoard/products" ><i className="fa-brands fa-product-hunt"></i>Products</NavLink>
            </div>
            <div className="user">
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/dashBoard/product/create"><i className="fa-solid fa-plus"></i>New Product</NavLink>
            </div>
        </div>
    )
}