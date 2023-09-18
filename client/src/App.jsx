import "./styles/App.css";
import "./styles/navigation.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"



const App = () => {
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState({data : ""});
  const navigate = useNavigate();
      
    const handleSearch = async () => {
      navigate(`/search/user/${searchText}`);
    }
    
    console.log(dataList);

  return (
    <>
      <div className = "mainpage">
        <div className="searchContainerHome">
          <h1>LoL Player Search</h1>
          <input
            className="searchbar"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
          ></input>
          <button className="searchbutton" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="footer">
          <p>Made with 💖 by Kevin He</p>
        </div>
      </div>
    </>
  )
  }

export default App;
