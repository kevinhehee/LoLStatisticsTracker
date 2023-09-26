import { useNavigate } from 'react-router-dom';
import "./chatroom.css"
import React from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const ChatRoom = ({ room }) => 
{   
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");
    if (!isAuth)
    {
        navigate(`/chatroom`);
    }
    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const unsubcribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages);
        });

        return () => unsubcribe();
    }, []);    

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
            room: room,
        });

        setNewMessage("");
        console.log(newMessage)
    }

    return (
        <div className = "chat-app">
            <div className = "header">
                <h1>{room} Queue Match</h1>

            </div>

            <div className = "messages">
                {messages.map((message) =>
                <div className = "message" key = {message.id}>
                    <span className = "user"> {message.user}: </span>
                    {message.text}
                </div>
                )}
            </div>

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

export default ChatRoom