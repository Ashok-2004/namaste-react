import { LOGO_LINK } from "../utils/constant";
import {useState} from "react";

const Header= ()=>{
    const [btnName,setbtnName]=useState("Login");
    return(
        <div className='header'>
            <div className="logo-container">
                <img className="logo" src={LOGO_LINK} />
            </div>
            <div className="nav-Items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{ btnName === "Login" ? setbtnName("Logout"): setbtnName("Login")}}>{btnName}</button>
                </ul>
            </div>
        </div>
    )
}
export default Header;