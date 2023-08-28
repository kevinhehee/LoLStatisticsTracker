const axios = require('axios');
const API_KEY = process.env.LOL_API_KEY;

function getRanked(ID)
{

    return axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + ID + "?api_key=" + API_KEY)
    .then(response =>
        {
            // console.log("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY);
            
            // console.log(response.data.length)

            let soloInfo = [];
            let flexInfo = []
            
            for (let i = 0; i < response.data.length; i++)
            {
                // console.log(response.data[i]);
                if (response.data[i].queueType == "RANKED_SOLO_5x5")
                {
                    soloInfo.push(response.data[i].tier);
                    soloInfo.push(response.data[i].rank);
                    soloInfo.push(response.data[i].leaguePoints);
                    soloInfo.push(response.data[i].wins);
                    soloInfo.push(response.data[i].losses);
                }
                else if (response.data[i].queueType == "RANKED_FLEX_SR")
                {
                    flexInfo.push(response.data[i].tier)
                    flexInfo.push(response.data[i].rank)
                    flexInfo.push(response.data[i].leaguePoints)
                    flexInfo.push(response.data[i].wins)
                    flexInfo.push(response.data[i].losses)
                }
            }

            if (soloInfo.length != 5)
            {
                soloInfo[0] = "Unranked";
                soloInfo[1] = "";
                soloInfo[2] = "0";
                soloInfo[3] = "0";
                soloInfo[4] = "0";
            }
            if (flexInfo.length != 5)
            {
                flexInfo[0] = "Unranked";
                flexInfo[1] = "";
                flexInfo[2] = "0";
                flexInfo[3] = "0";
                flexInfo[4] = "0";
            }

            return [
                soloInfo,
                flexInfo
            ]
        }
        ).catch(err => err);
}

module.exports = {
    getRanked
}