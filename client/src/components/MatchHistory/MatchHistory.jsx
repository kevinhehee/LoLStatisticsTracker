import React from 'react';
import GameType from './GameType'
import GameInfo from './GameInfo'
import './ChampIcon.css';
import '../../styles/App.css'

const MatchHistory = ({ matches }) => {

    return (
        <div className="matchdataContainer">
            {matches.map((gameData, index) => (
                <div className="gameContainer">
                    <GameType gameMode={gameData.info.gameMode}/>
                    <>
                        <GameInfo gameData={gameData.info.participants.slice(0, 5)} win = {gameData.info.teams[0].win}/>
                        
                        <GameInfo gameData={gameData.info.participants.slice(5, 10)} win = {gameData.info.teams[1].win}/>
                    </>
                </div>
            ))}
        </div>
    )

}

export default MatchHistory