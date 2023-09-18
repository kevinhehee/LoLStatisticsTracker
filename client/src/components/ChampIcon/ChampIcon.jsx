import React from 'react';
import PropTypes from 'prop-types';

const ChampIcon = ({ championId }) => {
    // Assuming you have a method to map championId to champion image URL
    if (championId === "FiddleSticks")
    {
        championId = "Fiddlesticks";
    } 

    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${championId}.png`;
    
    return (
        <p>
            <img src={imageUrl} alt={`Champion-${championId}`} className="champ-icon" />
        </p>
    );
};

ChampIcon.propTypes = {
    championId: PropTypes.string.isRequired,
};

export default ChampIcon;