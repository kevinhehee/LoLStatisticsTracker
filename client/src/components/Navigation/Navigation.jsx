import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from "react";
import Auth from "../Authentication/Auth";

import "./navigation.css"
const cookies = new Cookies();

const Navigate = () => 
{
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const navigate = useNavigate();

    const handleSignIn = (authStatus) => {
        setIsAuth(authStatus);
    }

    const handleHomePage = async () => {
        navigate(`/`)
    }

    const handleProfile = async () => {
        navigate(`/profile`)
    }

    const handleMatchMake = async () => {
        navigate(`/chatroom`)
    }

    return (
        <div class="navigation-container">
            <button onClick = {handleHomePage}>Home</button>
            <button onClick = {handleProfile}>Profile</button>
            <button onClick = {handleMatchMake}>Look for Teammates</button>
            <Auth onSignIn = {handleSignIn}/>
        </div>
    )

}

export default Navigate