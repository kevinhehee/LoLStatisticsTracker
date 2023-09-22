/* eslint-disable */
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

import Cookies from "universal-cookie"
const cookies = new Cookies();

export const Auth = () => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    const signInWithGoogle = async () => {

        try{
            const result = await signInWithPopup(auth, provider);
        // console.log(result);
        cookies.set("auth-token", result.user.refreshToken)
        } catch(err) {
            console.log(err);
        }
    };
    // console.log("SADFSDF");
    // console.log(isAuth);

    if (isAuth)
    {
        return (
            <></>
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