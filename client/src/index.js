import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./Search";
import PickChatRoom from "./components/ChatRoom/PickChatRoom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Navigate from "./components/Navigation/Navigation"
import Profile from "./components/Profile/Profile"
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <ChatRoom/> */}
      <Navigate/>
      <Routes>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/chatroom/flex" element = {<ChatRoom room = {"Flex"}/>}/>
        <Route path = "/chatroom/aram" element = {<ChatRoom room = {"ARAM"}/>}/>
        <Route path = "/chatroom/solo" element = {<ChatRoom room = {"Solo"}/>}/>
        <Route path = "/chatroom" element = {<PickChatRoom/>}/>
        <Route path = "/" element = {<App/>} />
        <Route path = "/search/user/:username" element = {<Search/>}/>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
