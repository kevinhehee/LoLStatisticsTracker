var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

// const [userInfo, setuserInfo] = useState("");
let userInfo = [];
const API_KEY = "RGAPI-b17e2ae2-ea6b-4bc3-83e3-fad1ad6f239e";

function getPlayerDATA(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
        .then(response => {
            if (playerName = null)
            {
                return null;
            }
            userInfo.push(response.data.name);
            userInfo.push(response.data.summonerLevel);
            userInfo.push(response.data.profileIconId);
            console.log(response.data);
            return response.data;
        }).catch(err => err);
}

app.get('/past5Games', async (req, res) => {
    const playerName = req.query.username;
    // PUUID
    const playerData = await getPlayerDATA(playerName);
    const PUUID = playerData.puuid;
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;

    // API call to find list of game IDs
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
        // list of game ID strings
    console.log(gameIDs);

    var matchDataArray = [];
    for (let i = 0; i < gameIDs.length - 15; i++)
    {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }

    var allDATA = [userInfo, matchDataArray];
    res.json(allDATA);
    userInfo.pop();
    userInfo.pop();
    userInfo.pop();
})


app.listen(4000, function () {
    console.log("Server started on port 4000")
})