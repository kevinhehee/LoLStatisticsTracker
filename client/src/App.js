import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([[]]);

  const getPlayerGames = (event) => {
    axios
      .get("http://localhost:4000/past5Games", {
        params: { username: searchText },
      })
      .then(function (response) {
        setGameList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(gameList);

  return (
    <div className="background">
      <div className="page">
        <div className="restcontainer">
          {
            gameList[0].length !== 0 ? (
              <div className="allRanksContainer">
                <div className="userInfoContainer">
                  <div className="searchContainerFound">
                    <h1>LoL Player Search</h1>
                    <input
                      className="searchbar"
                      type="text"
                      onChange={(e) => setSearchText(e.target.value)}
                    ></input>
                    <button className="searchbutton" onClick={getPlayerGames}>
                      Search
                    </button>

                    <p>Made with 💖 by Kevin He</p>
                  </div>

                  <div className="champSplashContainer">
                    <div className="userIconContainer">
                      <div className="userIcon">
                        <h1>{gameList[0][0]}</h1>

                        <h2>Level {gameList[0][1]}</h2>
                      </div>
                      <img
                        className="userIconImg"
                        src={
                          "http://ddragon.leagueoflegends.com/cdn/13.15.1/img/profileicon/" +
                          gameList[0][2] +
                          ".png"
                        }
                        alt="profile icon"
                      ></img>

                      {gameList[4].length !== 0 &&
                      gameList[4][0] != "Unranked" ? (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <h2>Solo/Duo</h2>
                            <img
                              width="160px"
                              height="160px"
                              src={require(
                                "./images/emblem-" +
                                  gameList[4][0].toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>

                          <div className="rankStats">
                            <h1>
                              {gameList[4][0]} {gameList[4][1]} {gameList[4][2]}{" "}
                              LP
                            </h1>
                            <h2>
                              {gameList[4][3]}W {gameList[4][4]}L
                            </h2>
                            <h2>
                              {(
                                (gameList[4][3] /
                                  (gameList[4][3] + gameList[4][4])) *
                                100
                              ).toFixed(2)}
                              % Win Rate
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <img
                              width="240px"
                              height="240px"
                              src={require(
                                "./images/emblem-" +
                                  gameList[4][0].toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>{gameList[4][0]}</h1>
                            <h2>
                              {gameList[4][3]}W {gameList[4][4]}L
                            </h2>
                            <h2>Solo/Duo</h2>
                          </div>
                        </div>
                      )}

                      {gameList[5].length !== 0 &&
                      gameList[5][0] != "Unranked" ? (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <h2>Flex</h2>
                            <img
                              width="160px"
                              height="160px"
                              src={require(
                                "./images/emblem-" +
                                  gameList[5][0].toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>
                              {gameList[5][0]} {gameList[5][1]} {gameList[5][2]}{" "}
                              LP
                            </h1>
                            <h2>
                              {gameList[5][3]}W {gameList[5][4]}L
                            </h2>
                            <h2>
                              {(
                                (gameList[5][3] /
                                  (gameList[5][3] + gameList[5][4])) *
                                100
                              ).toFixed(2)}
                              % Win Rate
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <img
                              width="160px"
                              height="160px"
                              src={require(
                                "./images/emblem-" +
                                  gameList[5][0].toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>{gameList[5][0]}</h1>
                            <h2>
                              {gameList[5][3]}W {gameList[5][4]}L
                            </h2>
                            <h2>Flex</h2>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* <div className = "HighestMastery">
                      <h1 style = {{textAlign: 'center'}} >Highest Mastery</h1>
                    </div> */}

                    <div className="SplashContainer">
                      <div className="champSplash">
                        <div>
                          <p className="champName">{gameList[3][1]}</p>
                        </div>

                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            gameList[3][0] +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>

                        <div>
                          <p className="masteryPoints">{gameList[2][1]} pts</p>
                        </div>
                      </div>

                      <div className="champSplash">
                        <div>
                          <p className="champName">{gameList[3][3]}</p>
                        </div>
                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            gameList[3][2] +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>
                        <div>
                          <p className="masteryPoints">{gameList[2][3]} pts</p>
                        </div>
                      </div>

                      <div className="champSplash">
                        <div>
                          <p className="champName">{gameList[3][5]}</p>
                        </div>
                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            gameList[3][4] +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>

                        <div>
                          <p className="masteryPoints">{gameList[2][5]} pts</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                      Replace with CS per minute, 
                  </div> */}
                </div>
              </div>
            ) : null
            // <div className = "leftdataContainer">
            // No player
            // </div>
          }

          {gameList[0].length !== 0 ? (
            <div className="matchdataContainer">
              {gameList[1].map((gameData, index) => (
                <div className="gameContainer">
                  <h2>
                    {gameData.info.gameMode == "ARAM" ? (
                      <p>ARAM</p>
                    ) : gameData.info.gameMode == "CLASSIC" ? (
                      <p>5v5</p>
                    ) : (
                      <p>Arena</p>
                    )}
                  </h2>

                  {gameData.info.participants.map((data, participantIndex) =>
                    data.win === true ? (
                      <div className="gameDataContainer">
                        <div
                          className="playerInfoContainer"
                          style={{ backgroundColor: "rgba(0, 239, 201, 1)" }}
                        >
                          <div className="champIcon">
                            <p>
                              {" "}
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src={
                                  "https://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/" +
                                  data.championName +
                                  ".png"
                                }
                                alt="champIcon"
                              ></img>
                            </p>
                          </div>
                          <p className="playerInfo">
                            {data.summonerName.substr(0, 10)}
                            <br />
                            {data.kills}/{data.deaths}/{data.assists}
                            <br />
                            K/DA (
                            {data.deaths == 0
                              ? data.kills + data.assists
                              : (
                                  (data.kills + data.assists) /
                                  data.deaths
                                ).toFixed(2)}
                            )
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="gameDataContainer">
                        <div
                          className="playerInfoContainer"
                          style={{ backgroundColor: "rgba(245, 39, 39, .8)" }}
                        >
                          <div className="champIcon">
                            <p>
                              <img
                                style={{ width: "50px", height: "50px" }}
                                src={
                                  "https://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/" +
                                  data.championName +
                                  ".png"
                                }
                                alt="champIcon"
                              ></img>
                            </p>
                          </div>
                          <p className="playerInfo">
                            {data.summonerName.substr(0, 10)}
                            <br />
                            {data.kills}/{data.deaths}/{data.assists}
                            <br />
                            K/DA (
                            {data.deaths == 0
                              ? data.kills + data.assists
                              : (
                                  (data.kills + data.assists) /
                                  data.deaths
                                ).toFixed(2)}
                            )
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="searchContainerHome">
                <h1>LoL Player Search</h1>
                <input
                  className="searchbar"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                ></input>
                <button className="searchbutton" onClick={getPlayerGames}>
                  Search
                </button>
              </div>

              <div className="credit">
                <p>Made with 💖 by Kevin He</p>
              </div>

              {/* <div className = "rightdataContainer">
                <p>data not found</p>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
