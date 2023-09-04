var express = require('express');
var cors = require('cors');
const axios = require('axios');
require('dotenv').config();
var app = express();

app.use(cors());


const {getPlayerDATA} =  require('./components/getPlayerDATA.js')
const {getPlayerCHAMP} = require('./components/getPlayerCHAMP.js')
const {getChampNames} = require('./components/getChampNames.js')
const {getRanked} = require('./components/getRanked.js')
const {getGameIDs} = require('./components/getGameIDs.js')
const {getMatchesInfo} = require('./components/getMatchesInfo.js')
const {getGeneralStats} = require('./components/getGeneralStats.js')

// const [userInfo, setuserInfo] = useState("");
let userInfo = [];
let userChampIDs = [];
let champNames = [];
let soloRankedInfo = [];
let flexRankedInfo = [];
let arenaRankedInfo = [];
let matchDataArray = [];
let averageMatchData = [];

const API_KEY = process.env.LOL_API_KEY;

// function getRankedInfo(id)
// {
    // return axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY)
    // .then(response =>
    //     {
    //         // console.log("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY);
            
    //         // console.log(response.data.length)
            
    //         for (let i = 0; i < response.data.length; i++)
    //         {
    //             // console.log(response.data[i]);
    //             if (response.data[i].queueType == "RANKED_SOLO_5x5")
    //             {
    //                 soloRankedInfo.push(response.data[i].tier);
    //                 soloRankedInfo.push(response.data[i].rank);
    //                 soloRankedInfo.push(response.data[i].leaguePoints);
    //                 soloRankedInfo.push(response.data[i].wins);
    //                 soloRankedInfo.push(response.data[i].losses);
                    
    //             }
    //             else if (response.data[i].queueType == "RANKED_FLEX_SR")
    //             {
    //                 flexRankedInfo.push(response.data[i].tier)
    //                 flexRankedInfo.push(response.data[i].rank)
    //                 flexRankedInfo.push(response.data[i].leaguePoints)
    //                 flexRankedInfo.push(response.data[i].wins)
    //                 flexRankedInfo.push(response.data[i].losses)
    //             }
    //             else if (response.data[i].queueType == "CHERRY")
    //             {
    //                 arenaRankedInfo.push(response.data[i].wins);
    //                 arenaRankedInfo.push(response.data[i].losses);
    //             }
                
    //         }

    //         // if (response.data.length == 1 && response.data[0].queueType == "RANKED_SOLO_5x5")
    //         // {
    //         //     rankedInfo.push(response.data[0].tier);
    //         //     rankedInfo.push(response.data[0].rank);
    //         //     rankedInfo.push(response.data[0].leaguePoints);
    //         //     rankedInfo.push(response.data[0].wins);
    //         //     rankedInfo.push(response.data[0].losses);
    //         // }
    //         // else if (response.data.length == 2 && response.data[1].queueType == "RANKED_SOLO_5x5")
    //         // {
    //         //     rankedInfo.push(response.data[1].tier);
    //         //     rankedInfo.push(response.data[1].rank);
    //         //     rankedInfo.push(response.data[1].leaguePoints);
    //         //     rankedInfo.push(response.data[1].wins);
    //         //     rankedInfo.push(response.data[1].losses);
    //         // }
    //         // else
    //         if (soloRankedInfo.length != 5)
    //         {
    //             soloRankedInfo[0] = "Unranked";
    //             soloRankedInfo[1] = "";
    //             soloRankedInfo[2] = "0";
    //             soloRankedInfo[3] = "0";
    //             soloRankedInfo[4] = "0";
    //         }
    //         if (flexRankedInfo.length != 5)
    //         {
    //             flexRankedInfo[0] = "Unranked";
    //             flexRankedInfo[1] = "";
    //             flexRankedInfo[2] = "0";
    //             flexRankedInfo[3] = "0";
    //             flexRankedInfo[4] = "0";
    //         }
    //         if (arenaRankedInfo.length != 2)
    //         {
    //             arenaRankedInfo[0] = "0";
    //             arenaRankedInfo[1] = "0";
    //         }
            
    //     }
    //     ).catch(err => err);
// }

app.get('/past5Games', async (req, res) => {

        const playerName = req.query.username;
    userInfo = await getPlayerDATA(playerName);

        const ID = userInfo[3];
        const PUUID = userInfo[4];

    userChampIDs = await getPlayerCHAMP(ID);

    champNames = await getChampNames(userChampIDs[0], userChampIDs[2], userChampIDs[4]);

    rankInfo = await getRanked(ID);

        soloRankedInfo = rankInfo[0];
        flexRankedInfo = rankInfo[1];

    gameIDs = await getGameIDs(PUUID);

    matchDataArray = await getMatchesInfo(gameIDs);

    averageMatchData = getGeneralStats(PUUID, matchDataArray);

    var allDATA = [userInfo, matchDataArray, userChampIDs, champNames, soloRankedInfo, flexRankedInfo, arenaRankedInfo, averageMatchData];
    
    res.json(allDATA);
    
    
    for (let i = 0; i < 6; i++)
    {
        userInfo.pop();
        matchDataArray.pop();
        userChampIDs.pop();
        champNames.pop();
        soloRankedInfo.pop();
        flexRankedInfo.pop();
        rankInfo.pop();
        averageMatchData.pop();
    }

    // console.log(allDATA);
})


app.listen(4000, function () {
    console.log("Server started on port 4000")
})