import React from 'react'
import { Link } from 'react-router-dom'
import ChampIcon from './ChampIcon'

const GameInfo = ( {gameData, win} ) => { 

    let background;
    let color;

    if (win)
    {
        background = "rgba(0, 239, 201, 1)";
        color = "black";
    }
    else
    {
        background = "rgba(245, 39, 39, .8)";
        color = "white";
    }
    return (

        gameData.map((data, participantIndex) =>
        (
        <div className="gameDataContainer">
            <div
            className="playerInfoContainer"
            style={{ backgroundColor: background }}
            >
            <ChampIcon championId = {data.championName}/>
            <p className="playerInfo">
                <Link to = {`/search/user/${data.summonerName}`} style={{ textDecoration: 'none', color: color}}> {data.summonerName.substr(0, 13)} </Link>
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
        ))
    )
}

export default GameInfo;