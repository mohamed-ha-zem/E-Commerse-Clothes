import { Link } from "react-router-dom";

export default function TopBar(){
    return (
        <div className="d-flex topBar container" style={{justifyContent: "space-between"}}>
            <h1>Store</h1>
            <Link to="/" className="button">Go to Web Site</Link>
        </div>
    )
}