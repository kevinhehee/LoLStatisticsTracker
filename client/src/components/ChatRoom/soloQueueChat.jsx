import { useNavigate } from 'react-router-dom';
import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const SoloChatRoom = () => 
{   
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState("");

    const messagesRef = collection(db, "messages");

    if (!isAuth)
    {
        navigate(`/chatroom`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "")
        {
            return;
        }
        
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            // room: soloQ;
        });

        setNewMessage("");
        console.log(newMessage)
    }

    return (
        <div className = "chat-app">
            <form onSubmit = {handleSubmit} className = "new-message-form">
                <input 
                    className = "new-message-input" 
                    placeholder = "Send your message here..."
                    onChange = {(e) => setNewMessage(e.target.value)}
                    value = {newMessage}
                />
                <button type = "submit" className = "send-button">
                    Send
                </button>
            </form>
        </div>
    )

}

export default SoloChatRoom