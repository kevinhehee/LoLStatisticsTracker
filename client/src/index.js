import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./Search";
import PickChatRoom from "./components/ChatRoom/PickChatRoom";
import SoloQueueChat from "./components/ChatRoom/soloQueueChat";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <ChatRoom/> */}
      <Routes>
        <Route path = "/chatroom/solo" element = {<SoloQueueChat/>}/>
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
