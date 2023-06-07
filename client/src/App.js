import './App.css';
import { useState } from "react";
import axios from "axios";



function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([[]]);


  function getPlayerGames(event) {
    axios.get("http://localhost:4000/past5Games", { params: { username: searchText}})
    .then(function (response) {
      setGameList(response.data);
    }).catch(function (error) {
      console.log(error);
    })
  }

  console.log(gameList);

  return (
    <div>
      <div className = "searchcontainer">
          <h1>LoL Player Search</h1>
          <input className = "searchbar" type = "text" onChange={e => setSearchText(e.target.value)}></input>
          <button className = "searchbutton" onClick = {getPlayerGames}>Search</button>
      </div>
      <div className = "page">
        

        <div className = "leftdataContainer">
          {gameList[0].length !== 0 ? 
          <>
            <div>
              <h1>{gameList[0][0]}</h1> 
              <p>Player Level: {gameList[0][1]}</p>
              <img width= "100px" height = "100px" src = {"http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/" + 
              gameList[0][2] + ".png"}></img>
            </div>
          </>
          :
          <>
          No player
          </>
          }


        </div>  

        

        <div className = "rightdataContainer">
          {gameList[0].length !== 0 ?
            <>
              {
                gameList[1].map((gameData,index) => 
                  <div class = "gameContainer">
                    <h2>Game {index + 1}</h2>
                    <div>
                      {gameData.info.participants.map((data, participantIndex) =>
                      <p>PLAYER {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>)
                      }

                    </div>
                  </div>
                )
              }
            </>
            :
            <>
              <p>data not found</p>
            </>
          }
        </div>


      </div>
    </div>
  );
}

export default App;
