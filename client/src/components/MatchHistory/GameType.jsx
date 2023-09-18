import React from 'react'

const GameType = ( {gameMode} ) =>{


    if (gameMode === "CLASSIC")
    {
        gameMode = "5v5";
    }
    else if (gameMode === "ARAM")
    {
        gameMode = "ARAM";
    }
    else
    {
        gameMode = "Arena"
    }
    return (
        <h2>
            {gameMode}
        </h2>
    )
}

export default GameType;