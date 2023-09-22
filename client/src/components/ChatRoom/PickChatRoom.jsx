import { useNavigate } from "react-router-dom";
import { Auth } from "../Authentication/Auth";
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const PickChatRoom = () => {


    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);
    const roomInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSignIn = (authStatus) => {
        setIsAuth(authStatus);
    }

    const handleChatNavigate = (chatRoom) => {
        navigate(`/chatroom/${chatRoom}`)
    }

    return (
        <div>
            {isAuth ? 
            (

                <div>

                    <button onClick = {() => handleChatNavigate("solo")}>Solo Queue Chat</button>

                </div>
                // <div className = "room">  
                //     <label>Enter Room Name: </label>
                //     <input ref = {roomInputRef}/>
                //     <button onClick = {() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
                // </div>
            ) 
            :
            <div>
                <Auth onSignIn = {handleSignIn}/>
            </div>
            
            }



        </div>
    )
}

export default PickChatRoom