
import { useState } from "react";
import Cookies from "universal-cookie"
const cookies = new Cookies();

const ChatRoom = () => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [room, setRoom] = useState(null);
    

    return (
        <div>
            {room ? 
            (<div> Chat </div>) 
            :
            <div className = "room">  
                <label>Enter Room Name: </label>
                <input/>
                <button>Enter Chat</button>
            </div>
            
            }



        </div>
    )
}

export default ChatRoom