import React from 'react'
import "./AverageStats.css"


const AverageStats = ({ averageMatchData }) => {

    let averageCS = averageMatchData?.averageCS;
    let averageVS = averageMatchData?.averageVS;
    let ControlWards = averageMatchData?.ControlWards;

    return (

        <div className = "averageStatsContainer">
            <h1>Average CS: {averageCS}/game</h1>
            <h1>Average Vision Score: {averageVS}/game</h1>
            <h1>{ControlWards} Control Wards</h1>
        </div>





    )

}

export default AverageStats