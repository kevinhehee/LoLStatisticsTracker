import React from "react"
import SplashArt from "./SplashArt"


const ChampMastery = ({champNames, champs}) => {
    return (
        <div className="SplashContainer">

            <SplashArt champName = {champNames.champ1Name} champID = {champNames.champ1ID} champPoints = {champs.champ1Points}/>
            <SplashArt champName = {champNames.champ2Name} champID = {champNames.champ2ID} champPoints = {champs.champ2Points}/>
            <SplashArt champName = {champNames.champ3Name} champID = {champNames.champ3ID} champPoints = {champs.champ3Points}/>

        </div>
    )
}

export default ChampMastery