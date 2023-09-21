import React from "react"
import PropTypes from 'prop-types'
import "./SplashArt.css"

const SplashArt = ({ champName, champID, champPoints}) => {
    return (
        <div className="champSplash">
            <div>
                <p className="champName">{champName}</p>
            </div>

            <img
            width="154px"
            height="280px"
            src={
                "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" +
                champID +
                "_0.jpg"
            }
            alt="Champion Splash"
            ></img>

            <div>
                <p className="masteryPoints">{champPoints} pts</p>
            </div>
        </div>
    )
}

SplashArt.propTypes = {
    champName: PropTypes.string.isRequired,
    champID: PropTypes.string.isRequired,
    champPoints: PropTypes.string.isRequired,
};

export default SplashArt