var express = require('express');
var cors = require('cors');
const axios = require('axios');
require('dotenv').config();
var app = express();

app.use(cors());


const {getPlayerDATA} =  require('./components/getPlayerDATA.js')

// const [userInfo, setuserInfo] = useState("");
let userInfo = [];
let userChampIDs = [];
let champNames = [];
let soloRankedInfo = [];
let flexRankedInfo = [];
let arenaRankedInfo = [];
let allGamesInfo = [];

const API_KEY = process.env.LOL_API_KEY;

// function getPlayerDATA(playerName) {
//     return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
//         .then(response => {
//             if (playerName = null)
//             {
//                 return null;
//             }
//             userInfo.push(response.data.name);
//             userInfo.push(response.data.summonerLevel);
//             userInfo.push(response.data.profileIconId);
//             userInfo.push(response.data.id)
//             // userInfo.push(response.data.id)
//             // console.log(response.data);
//             return response.data;
//         }).catch(err => err);
// }

function getPlayerCHAMP(PUUID) 
{
    return axios.get("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + userInfo[3] + "/top?api_key=" + API_KEY)
        .then(response => {
            console.log("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + userInfo[3] + "/top?api_key=" + API_KEY);
            userChampIDs.push(response.data[0].championId);
            userChampIDs.push(response.data[0].championPoints);

            userChampIDs.push(response.data[1].championId);
            userChampIDs.push(response.data[1].championPoints);

            userChampIDs.push(response.data[2].championId);
            userChampIDs.push(response.data[2].championPoints);

        }).catch(err => err);
}

function getChampfromID(PUUID)
{            
    return axios.get("https://ddragon.leagueoflegends.com/cdn/13.15.1/data/en_US/champion.json")
    .then(response => 
    {
        let allchamps = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KSante","Kaisa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","Milio","MissFortune","Mordekaiser","Morgana","Nami","Naafiri","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","MonkeyKing","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"];

        for (let i = 0; i < allchamps.length; i++)
        {
            var check = response.data.data[allchamps[i]];

            if(check.key === userChampIDs[0].toString())
            {
                
                champNames.push(check.id);
                champNames.push(check.name);
                break;
            }
        }

        for (let i = 0; i < allchamps.length; i++)
        {
            var check = response.data.data[allchamps[i]];
            

            if(check.key === userChampIDs[2].toString())
            {
                champNames.push(check.id);
                champNames.push(check.name);
                break;
            }
        }

        for (let i = 0; i < allchamps.length; i++)
        {
            var check = response.data.data[allchamps[i]];
            
            if(check.key === userChampIDs[4].toString())
            {
                champNames.push(check.id);
                champNames.push(check.name);
                break;
            }
        }
    }).catch(err => err);
}

function getRankedInfo(id)
{
    return axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY)
    .then(response =>
        {
            // console.log("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY);
            
            console.log(response.data.length)
            
            for (let i = 0; i < response.data.length; i++)
            {
                console.log(response.data[i]);
                if (response.data[i].queueType == "RANKED_SOLO_5x5")
                {
                    soloRankedInfo.push(response.data[i].tier);
                    soloRankedInfo.push(response.data[i].rank);
                    soloRankedInfo.push(response.data[i].leaguePoints);
                    soloRankedInfo.push(response.data[i].wins);
                    soloRankedInfo.push(response.data[i].losses);
                    
                }
                else if (response.data[i].queueType == "RANKED_FLEX_SR")
                {
                    flexRankedInfo.push(response.data[i].tier)
                    flexRankedInfo.push(response.data[i].rank)
                    flexRankedInfo.push(response.data[i].leaguePoints)
                    flexRankedInfo.push(response.data[i].wins)
                    flexRankedInfo.push(response.data[i].losses)
                }
                else if (response.data[i].queueType == "CHERRY")
                {
                    arenaRankedInfo.push(response.data[i].wins);
                    arenaRankedInfo.push(response.data[i].losses);
                }
                
            }

            // if (response.data.length == 1 && response.data[0].queueType == "RANKED_SOLO_5x5")
            // {
            //     rankedInfo.push(response.data[0].tier);
            //     rankedInfo.push(response.data[0].rank);
            //     rankedInfo.push(response.data[0].leaguePoints);
            //     rankedInfo.push(response.data[0].wins);
            //     rankedInfo.push(response.data[0].losses);
            // }
            // else if (response.data.length == 2 && response.data[1].queueType == "RANKED_SOLO_5x5")
            // {
            //     rankedInfo.push(response.data[1].tier);
            //     rankedInfo.push(response.data[1].rank);
            //     rankedInfo.push(response.data[1].leaguePoints);
            //     rankedInfo.push(response.data[1].wins);
            //     rankedInfo.push(response.data[1].losses);
            // }
            // else
            if (soloRankedInfo.length != 5)
            {
                soloRankedInfo[0] = "Unranked";
                soloRankedInfo[1] = "";
                soloRankedInfo[2] = "0";
                soloRankedInfo[3] = "0";
                soloRankedInfo[4] = "0";
            }
            if (flexRankedInfo.length != 5)
            {
                flexRankedInfo[0] = "Unranked";
                flexRankedInfo[1] = "";
                flexRankedInfo[2] = "0";
                flexRankedInfo[3] = "0";
                flexRankedInfo[4] = "0";
            }
            if (arenaRankedInfo.length != 2)
            {
                arenaRankedInfo[0] = "0";
                arenaRankedInfo[1] = "0";
            }
            
        }
        ).catch(err => err);
}

app.get('/past5Games', async (req, res) => {

    const playerName = req.query.username;
    // PUUID
    // const playerData = await getPlayerDATA(playerName);
    
    userInfo = await getPlayerDATA(playerName);
    console.log(userInfo);
    console.log(userInfo[4]);

    const ID = userInfo[3];
    const PUUID = userInfo[4];
    
    const playerChamp = await getPlayerCHAMP(PUUID);
    console.log(userChampIDs);
    // console.log(playerData.id);
    const rankInfo = await getRankedInfo(ID);

    const work = await getChampfromID(PUUID);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;
    // console.log(API_CALL);
    // API call to find list of game IDs
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
        // list of game ID strings

    // console.log(gameIDs);


    // var emptySpace = "                                                                                                                                                                                                                                                                                                                                                                                                                      ";

    var matchDataArray = [];
    for (let i = 0; i < gameIDs.length - 15; i++)
    {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        // console.log("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY);
        matchDataArray.push(matchData);
        
        // console.log(matchData);
    }
    console.log(champNames);
    // for (let i = 0; i < 5; i++)
    // {
    //     userInfo.push(emptySpace);
    //     userChampIDs.push(emptySpace);
    //     champNames.push(emptySpace);
    //     rankedInfo.push(emptySpace);
    // }

    var allDATA = [userInfo, matchDataArray, userChampIDs, champNames, soloRankedInfo, flexRankedInfo, arenaRankedInfo];
    
    res.json(allDATA);
    
    for (let i = 0; i < 11; i++)
    {
        userInfo.pop();
        matchDataArray.pop();
        userChampIDs.pop();
        champNames.pop();
        soloRankedInfo.pop();
        flexRankedInfo.pop();
        arenaRankedInfo.pop();
    }
    for (let i = 0; i < allDATA.length; i++)
    {
        allDATA[i].length = 0;
    }
    
    
})


app.listen(4000, function () {
    console.log("Server started on port 4000")
})