import { useState, useEffect } from "react";
import "./profile.css";
import Cookies from "universal-cookie"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Auth from "../Authentication/Auth";

const cookies = new Cookies();

const Profile = () =>
{
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [userName, setUsername] = useState("");
    const [uid, setUid] = useState(null);
    const [isEditingUsername, setIsEditingUsername] = useState(false);


    const handleSignIn = (authStatus) => {
        setIsAuth(authStatus);
    }

    const handleSave = async () => {
        if (userName && uid)
        {
            const usersRef = doc(db, "profiles", uid);
            
            await setDoc(usersRef, {
                leagueUsername: userName,
                uid: uid,
            }, { merge: true });
            console.log("profile username saved for ", uid);
        }
    }

    const fetchUserData = async () => {
        if (uid)
        {
            const userDocRef = doc(db, "profiles", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists())
            {
                setUsername(userDoc.data().leagueUsername);
            }
            else
            {
                setUsername("No user saved");
            }
        }
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user)
            {
                setUid(user.uid);
            }
            else
            {
                setUid(null);
            }
        })
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [uid])

    return (
        <div className = "profileContainer">
        {isAuth ? 
            (
                <>
                    <input 
                        className = "profileInfo"
                        type = "text"
                        placeholder="Enter League Username"
                        value = {userName}
                        onChange = {(e) => setUsername(e.target.value)}
                        readOnly = {!isEditingUsername}
                    />
                    <button onClick = {() => {
                        if (isEditingUsername)
                        {
                            handleSave();
                        }
                        setIsEditingUsername(!isEditingUsername)}
                    }
                        >{isEditingUsername ? "Save" : "Edit"}</button>
                    <p>Is Editing: {isEditingUsername ? "True" : "False"}</p>
                    {/* <button onClick = {handleSave}>Save</button> */}
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