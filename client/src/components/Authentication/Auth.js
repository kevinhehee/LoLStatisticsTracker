/* eslint-disable */
import { auth, provider } from "../../firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

import Cookies from "universal-cookie"
const cookies = new Cookies();

export const Auth = ({ onSignIn }) => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    const signInWithGoogle = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true);
        onSignIn(true);
        } catch(err) {
            console.log(err);
        }
    };
    
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
    }

    if (isAuth)
    {
        return (
            <div className = "signOut">
                <button onClick = {signUserOut}>Sign Out</button>
            </div>
        )
    }
    else
    {
        return (
        <div className = "signIn">
            <h1>Sign In With Google To Continue</h1>
            <button onClick = {signInWithGoogle}> Sign in With Google</button>
             
        </div>
    )
    }

    
        

    
}