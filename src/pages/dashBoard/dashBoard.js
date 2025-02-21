import { Outlet } from "react-router-dom"
import "./dashBoard.css"
import SideBar from "./sideBar"
import TopBar from "./topBar"

export default function DashBoard(){
    return( 
        <div>
            <div>
                <TopBar/>
                <div style={{display: "flex"}}>
                    <div className="sideBar">
                        <SideBar/>
                    </div>
                    <div style={{width: "80%"}}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}



