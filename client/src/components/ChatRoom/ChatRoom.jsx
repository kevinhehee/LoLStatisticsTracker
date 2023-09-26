import { useNavigate } from 'react-router-dom';
import "./chatroom.css"
import React from "react";
import { doc, addDoc, getDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const cookies = new Cookies();


const ChatRoom = ({ room }) => 
{   
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [uid, setUid] = useState(null);
    const [userName, setUsername] = useState("");

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

    const fetchUserData = async () => {

        if (uid)
        {
            const userDocRef = doc(db, "profiles", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists())
            {
                console.log("username set");
                setUsername(userDoc.data().leagueUsername);
            }
            else
            {
                setUsername("");
            }
        }
        console.log(userName);
        
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user)
            {
                setUid(user.uid);
                console.log("set");
                
            }
            else
            {
                console.log("not set");
                setUid(null);
            }
        })
    }, [])

    useEffect(() => {
        fetchUserData();
    }, [uid])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "")
        {
            return;
        }
        
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: userName,
            room: room,
        });

        setNewMessage("");
        // console.log(newMessage);
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
                    disabled = {userName === ""}
                />
                <button type = "submit" className = "send-button">
                    Send
                </button>
            </form>

            {userName === "" && (
                <div>
                    Your username is required to be set. Visit the profile tab.
                </div>
            )}
        </div>
    )

}

export default ChatRoom