import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState({data : "hello"});

  const getPlayerGames = (event) => {
    axios
      .get("http://localhost:4000/past5Games", {
        params: { username: searchText },
      })
      .then(function (response) {
        setDataList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(dataList);

  return (
    <div className="background">
      <div className="page">
        <div className="restcontainer">
          {
            dataList.user && Object.keys(dataList.user) != 0 ? (
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
                        <h1>{dataList.user.name}</h1>

                        <h2>Level {dataList.user.summonerLevel}</h2>
                      </div>
                      <img
                        className="userIconImg"
                        src={
                          "http://ddragon.leagueoflegends.com/cdn/13.15.1/img/profileicon/" +
                          dataList.user.profileIconId +
                          ".png"
                        }
                        alt="profile icon"
                      ></img>

                      {dataList.soloRankedInfo.rank != "Unranked" ? (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <h2>Solo/Duo</h2>
                            <img
                              width="160px"
                              height="160px"
                              src={require(
                                "./images/emblem-" +
                                  dataList.soloRankedInfo.tier.toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>

                          <div className="rankStats">
                            <h1>
                              {dataList.soloRankedInfo.tier} {dataList.soloRankedInfo.rank} {dataList.soloRankedInfo.LP}{" "}
                              LP
                            </h1>
                            <h2>
                              {dataList.soloRankedInfo.wins}W {dataList.soloRankedInfo.losses}L
                            </h2>
                            <h2>
                              {(
                                (dataList.soloRankedInfo.wins /
                                  (dataList.soloRankedInfo.wins + dataList.soloRankedInfo.losses)) *
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
                                dataList.soloRankedInfo.tier.toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>{dataList.soloRankedInfo.tier}</h1>
                            <h2>
                            {dataList.soloRankedInfo.wins}W {dataList.soloRankedInfo.losses}L
                            </h2>
                            <h2>Solo/Duo</h2>
                          </div>
                        </div>
                      )}

                      {Object.keys(dataList.flexRankedInfo).length !== 0 &&
                      dataList.flexRankedInfo.tier != "Unranked" ? (
                        <div className="rankInfoContainer">
                          <div className="rankIcon">
                            <h2>Flex</h2>
                            <img
                              width="160px"
                              height="160px"
                              src={require(
                                "./images/emblem-" +
                                dataList.flexRankedInfo.tier.toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>
                              {dataList.flexRankedInfo.tier} {dataList.flexRankedInfo.rank} {dataList.flexRankedInfo.LP}{" "}
                              LP
                            </h1>
                            <h2>
                              {dataList.flexRankedInfo.wins}W {dataList.flexRankedInfo.losses}L
                            </h2>
                            <h2>
                              {(
                                (dataList.flexRankedInfo.wins /
                                  (dataList.flexRankedInfo.wins + dataList.flexRankedInfo.losses)) *
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
                                  dataList.flexRankedInfo.tier.toLowerCase() +
                                  ".png",
                              )}
                              alt="rankemblem"
                            ></img>
                          </div>
                          <div className="rankStats">
                            <h1>{dataList.flexRankedInfo.tier}</h1>
                            <h2>
                              {dataList.flexRankedInfo.wins}W {dataList.flexRankedInfo.losses}L
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
                          <p className="champName">{dataList.champNames.champ1Name}</p>
                        </div>

                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            dataList.champNames.champ1ID +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>

                        <div>
                          <p className="masteryPoints">{dataList.champs.champ1Points} pts</p>
                        </div>
                      </div>

                      <div className="champSplash">
                        <div>
                          <p className="champName">{dataList.champNames.champ2Name}</p>
                        </div>
                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            dataList.champNames.champ2ID +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>
                        <div>
                          <p className="masteryPoints">{dataList.champs.champ2Points} pts</p>
                        </div>
                      </div>

                      <div className="champSplash">
                        <div>
                          <p className="champName">{dataList.champNames.champ3Name}</p>
                        </div>
                        <img
                          width="154px"
                          height="280px"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                            dataList.champNames.champ3ID +
                            "_0.jpg"
                          }
                          alt="Champion Splash"
                        ></img>

                        <div>
                          <p className="masteryPoints">{dataList.champs.champ3Points} pts</p>
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

          {dataList.user && Object.keys(dataList.user).length != 0 ? (
            <div className="matchdataContainer">
              {dataList.matches.map((gameData, index) => (
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
