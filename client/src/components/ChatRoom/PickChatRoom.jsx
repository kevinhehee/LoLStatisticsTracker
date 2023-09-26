import { useNavigate } from "react-router-dom";
import Auth from "../Authentication/Auth"
import "./pickchatroom.css";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const PickChatRoom = () => {

    
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const navigate = useNavigate();

    const handleSignIn = (authStatus) => {
        setIsAuth(authStatus);
    }

    const handleChatNavigate = (chatRoom) => {
        navigate(`/chatroom/${chatRoom}`)
    }

    return (
        <div className = "chatRoomSelectionContainer">
            {isAuth ? 
            (
                <>
                <div className = "buttonContainer">
                    <button onClick = {() => handleChatNavigate("solo")}>Solo Queue Chat</button>
                    <button onClick = {() => handleChatNavigate("flex")}>Flex Queue Chat</button>
                    <button onClick = {() => handleChatNavigate("aram")}>ARAM</button>
                    <p>Enter a chat room</p>
                    <Auth onSignIn = {handleSignIn}/>
                </div>
                </>
            ) 
            :
            <div>
                <div className = "buttonContainer">
                    <h1>Sign in to Continue</h1>
                    <Auth onSignIn = {handleSignIn}/>
                </div>
            </div>
            
            }



        </div>
    )
}

export default PickChatRoom