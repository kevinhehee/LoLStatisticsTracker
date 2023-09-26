import "./homepage.css"
import { useState } from "react";
import axios from "axios";
import Navigate from "../Navigation/Navigation"
// import Navigate from "../components/Navigation/Navigation"
import { useNavigate } from "react-router-dom"
import Auth from "../Authentication/Auth"
import Cookies from "universal-cookie"
const cookies = new Cookies();



const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState({data : ""});
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
      
    const handleSearch = async () => {
      if (searchText.length <= 3)
      {
        console.log("LESS THAN THREE")
        setIsInvalid(true);
        return;
      }

      navigate(`/search/user/${searchText}`);
    }
    
    console.log(dataList);

  return (
    <>
      <div className = "mainpage">
        <div className="searchContainerHome">
          <h1>MetaMetrics</h1>
          <input
            className="searchbar"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
          ></input>
          <button className="searchbutton" onClick={handleSearch}>
            Search
          </button>
          {isInvalid && <span>User must have more than 2 characters</span>}
          <Navigate/>
          
        </div>

        
      </div>
      
      <div className="footer">
          <p>Made with 💖 by Kevin He</p>
      </div>
    </>
  )
  }

export default HomePage;
