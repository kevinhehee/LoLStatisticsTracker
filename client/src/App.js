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
              <div className = "userInfoContainer">

                <div className = "summonerName">
                  <h1>{gameList[0][0]}</h1> 
                  <img min-width = "50%" min-height = "50%" src = {"http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/" + 
                      gameList[0][2] + ".png"}>
                  </img>
                  <p>Level {gameList[0][1]}</p>
                </div>
              </div>

              <div className = "rankPortraitContainer">
                
                <div className = "rankInfoContainer">
                

                </div>

                <div className = "portraitContainer">

                  <div className = "HighestMastery">
                    <h1 style = {{textAlign: 'center'}} >Highest Mastery</h1>
                  </div>
                  
                  <div className = "champSplashContainer">

                    <div className = "champSplash">
                      <champname className = "champname">{gameList[3][0]}</champname>
                      <img width = "231px" height = "420px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][0] + "_0.jpg"}></img>
                      <masteryPoints className = "masteryPoints">{gameList[2][1]} pts</masteryPoints>
                    </div>

                    <div className = "champSplash">
                      <champname className = "champname">{gameList[3][1]}</champname>
                      <img width = "231px" height = "420px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][1] + "_0.jpg"}></img>
                      <masteryPoints className = "masteryPoints">{gameList[2][3]} pts</masteryPoints>
                    </div>

                    <div className = "champSplash">
                      <champname className = "champname">{gameList[3][2]}</champname>
                      <img width = "231px" height = "420px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][2] + "_0.jpg"}></img>
                      <masteryPoints className = "masteryPoints">{gameList[2][5]} pts</masteryPoints>
                    </div>
                    
                  </div>
                </div>
                

                
              </div>

              

              

              {/* <div className = "rankInfoContainer">
                <h1>Hello </h1>

              </div> */}
            
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
                  <div className = "gameContainer">
                    <h2>Game {index + 1}</h2>
                    <div>
                      {gameData.info.participants.map((data, participantIndex) => (data.win === true
                        ?
                        (
                        <div className = "playerInfoContainer" style = {{backgroundColor: "lightblue" }}>
                          <p className = "playerInfo">{data.summonerName},<br></br>{data.kills}/{data.deaths}/{data.assists} <br></br>KDA: {((data.kills + data.assists) / data.deaths).toFixed(2)}</p>
                          <p> <img src = {"https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/" + data.championName + ".png"} style = {{width: "40px", height: "40px"}}></img></p>
                        </div>
                        )
                          
                          :
                        (
                        <div className = "playerInfoContainer" style = {{backgroundColor: "red"}}>
                          <p className = "playerInfo">{data.summonerName},<br></br>{data.kills}/{data.deaths}/{data.assists} <br></br>KDA: {((data.kills + data.assists) / data.deaths).toFixed(2)}</p>
                          <p style = {{alignContent: "flex-end"}}><img style = {{width: "40px", height: "40px"}}src = {"https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/" + data.championName + ".png"} ></img></p>
                        </div>
                        )
                        )
                        )
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
