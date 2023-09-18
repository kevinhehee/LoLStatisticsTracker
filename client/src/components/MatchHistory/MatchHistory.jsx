import React from 'react';
import ChampIcon from './ChampIcon'
import GameType from './GameType'
import './ChampIcon.css';

const MatchHistory = ({ matches }) => {

    return (
        <div className="matchdataContainer">
                {matches.map((gameData, index) => (
                  <div className="gameContainer">
                    
                    <GameType gameMode={gameData.info.gameMode}/>

                    {gameData.info.participants.map((data, participantIndex) =>
                      data.win === true ? (
                        <div className="gameDataContainer">
                          <div
                            className="playerInfoContainer"
                            style={{ backgroundColor: "rgba(0, 239, 201, 1)" }}
                          >
                            <ChampIcon championId = {data.championName}/>
                            <p className="playerInfo">
                              {data.summonerName.substr(0, 13)}
                              <br />
                              {data.kills}/{data.deaths}/{data.assists}
                              <br />
                              K/DA (
                              {data.deaths === 0
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
                                <ChampIcon championId = {data.championName}/>
                            
                            <p className="playerInfo">
                              {data.summonerName.substr(0, 13)}
                              <br />
                              {data.kills}/{data.deaths}/{data.assists}
                              <br />
                              K/DA (
                              {data.deaths === 0
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
    )

}

export default MatchHistory