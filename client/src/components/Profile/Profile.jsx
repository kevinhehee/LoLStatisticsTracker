import { useState } from "react";
import "./profile.css";
import Cookies from "universal-cookie"
import Auth from "../Authentication/Auth";

const cookies = new Cookies();

const Profile = () =>
{
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const handleSignIn = (authStatus) => {
        setIsAuth(authStatus);
    }

    return (
        <div className = "profileContainer">
        {isAuth ? 
            (
                <>
                    <input 
                    className = "profileInfo"
                    type = "text"
                    placeholder="Enter League Username"/>
                    {/* <button onClick = {}></button> */}
                </>
            ) 
            :
            (
                <div>
                    <Auth onSignIn = {handleSignIn}/>
                </div>
        )}
        </div>



    )

}


export default Profile