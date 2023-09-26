import Search from "./components/StatsDisplay/StatsDisplay";
import PickChatRoom from "./components/ChatRoom/PickChatRoom";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import Profile from "./components/Profile/Profile"
import HomePage from "./components/HomePage/HomePage"
import Navigate from "./components/Navigation/Navigation"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie"

const App = () => {
  return (
    <BrowserRouter>
      <Navigate/>
      <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/chatroom/flex" element = {<ChatRoom room = {"Flex"}/>}/>
          <Route path = "/chatroom/aram" element = {<ChatRoom room = {"ARAM"}/>}/>
          <Route path = "/chatroom/solo" element = {<ChatRoom room = {"Solo"}/>}/>
          <Route path = "/chatroom" element = {<PickChatRoom/>}/>
          <Route path = "/search/user/:username" element = {<Search/>}/>
      </Routes>
    </BrowserRouter>
  )
  }

export default App;
