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
        
            
        
          {gameList[0].length !== 0 ? 
          <div className = "leftdataContainer">
              <div className = "userInfo Container">
              
                <div className = "summonerName">
                  <h1>{gameList[0][0]}</h1> 
                  <img min-width = "50%" min-height = "50%" src = {"http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/" + 
                      gameList[0][2] + ".png"} alt = "profile icon">
                  </img>
                  <p>Level {gameList[0][1]}</p>
                </div>
              </div>

              <div className = "rankPortraitContainer">
                
                
              {/* biji */}
                  {gameList[4].length !== 0 ?
                  (
                    
                  <div className = "rankInfoContainer">
                      
                      <div className = "rankIcon">
                        <img width = "200px" height = "200px" src = {require("./images/emblem-" + gameList[4][0].toLowerCase() + ".png")} alt = "rankemblem"></img>
                        
                      </div>
                      
                      <div className = "rankStats">
                        <h1>{gameList[4][0]} {gameList[4][1]} {gameList[4][2]} LP</h1>
                        <h2>{gameList[4][3]}W {gameList[4][4]}L</h2>
                        <h2>{(gameList[4][3] / (gameList[4][3] + gameList[4][4])).toFixed(2) * 100}% Win Rate</h2>
                      </div>
                  </div>
                  )
                  :
                  (
                  <div className = "rankInfoContainer">
                    <div>NO RANK</div>
                  </div>
                  )
                  


                  }

               

                <div className = "portraitContainer">

                  <div className = "HighestMastery">
                    <h1 style = {{textAlign: 'center'}} >Highest Mastery</h1>
                  </div>
                  
                  <div className = "champSplashContainer">

                    <div className = "champSplash">
                      <div>
                        <champname className = "champname">{gameList[3][0]}</champname>
                      </div>

                      <img width = "154px" height = "280px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][0] + "_0.jpg"} alt = "Champion Splash"></img>
                      
                      <div>
                        <masteryPoints className = "masteryPoints">{gameList[2][1]} pts</masteryPoints>
                      </div>
                    </div>

                    <div className = "champSplash">
                      <div>
                        <champname className = "champname">{gameList[3][1]}</champname>
                      </div>
                      <img width = "154px" height = "280px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][1] + "_0.jpg"} alt = "Champion Splash"></img>
                      <div>
                        <masteryPoints className = "masteryPoints">{gameList[2][3]} pts</masteryPoints>
                      </div>
                    </div>

                    <div className = "champSplash">
                      <div>
                        <champname className = "champname">{gameList[3][2]}</champname>
                      </div>
                      <img width = "154px" height = "280px" src = {"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + gameList[3][2] + "_0.jpg"} alt = "Champion Splash"></img>
                      
                      <div>
                        <masteryPoints className = "masteryPoints">{gameList[2][5]} pts</masteryPoints>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
              {/* <div className = "rankInfoContainer">
                <h1>Hello </h1>

              </div> */}
            </div>
          :
          <div className = "leftdataContainer">
          No player
          </div>
          }


        
          {gameList[0].length !== 0 ?
            <div className = "rightdataContainer">
              {
                gameList[1].map((gameData,index) => 
                  <div className = "gameContainer">
                    <h2>Game {index + 1}</h2>
                    
                      {gameData.info.participants.map((data, participantIndex) => (data.win === true
                        ?
                        (
                        <div className = "gameDataContainer">
                          <div className = "playerInfoContainer" style = {{backgroundColor: "lightblue" }}>
                            <p className = "playerInfo">{(data.summonerName).substr(0, 10)},<br></br>{data.kills}/{data.deaths}/{data.assists} <br></br>({((data.kills + data.assists) / data.deaths).toFixed(2)})</p>
                            <div className = "champIcon">
                              <p> <img style = {{width: "50px", height: "50px"}} src = {"https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/" + data.championName + ".png"} alt = "champIcon"></img></p>
                            </div>
                          </div>
                        </div>
                        )
                          :
                        (
                        <div className = "gameDataContainer">
                          <div className = "playerInfoContainer" style = {{backgroundColor: "red"}}>
                            <p className = "playerInfo">{data.summonerName},<br></br>{data.kills}/{data.deaths}/{data.assists} <br></br>({((data.kills + data.assists) / data.deaths).toFixed(2)})</p>
                            <div className = "champIcon">
                              <p ><img style = {{width: "50px", height: "50px"}} src = {"https://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/" + data.championName + ".png"} alt = "champIcon"></img></p>
                            </div>
                          </div>
                        </div>
                        )
                        )
                        )
                      }
                    </div>
                )
              }
            </div>
            :
            <div className = "rightdataContainer">
              <p>data not found</p>
            </div>
          }


      </div>
    </div>
  );
}

export default App;
