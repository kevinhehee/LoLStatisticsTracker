import { useNavigate } from "react-router-dom";

import "./navigation.css"

const Navigate = () => 
{
    const navigate = useNavigate();

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
            <button onClick = {handleMatchMake}>Chat</button>
        </div>
    )

}

export default Navigate