var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

// const [userInfo, setuserInfo] = useState("");
let userInfo = [];
let userChampIDs = [];
let champNames = [];
let rankedInfo = [];
const API_KEY = "RGAPI-a55a5d81-099b-44c0-87cc-701afc1cc10f";

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
            // userInfo.push(response.data.id)
            console.log(response.data);
            return response.data;
        }).catch(err => err);
}

function getPlayerCHAMP(PUUID) 
{
    return axios.get("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + PUUID + "?api_key=" + API_KEY)
        .then(response => {
            // console.log("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + PUUID + "?api_key=" + API_KEY);
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
    return axios.get("http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json")
    .then(response => 
    {
        let allchamps = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","Kaisa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","MissFortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","MonkeyKing","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"];

        for (let i = 0; i < allchamps.length; i++)
        {
            var check = response.data.data[allchamps[i]];

            if(check.key === userChampIDs[0].toString())
            {
                champNames.push(check.id);
            }
            else if(check.key === userChampIDs[2].toString())
            {
                champNames.push(check.id);
            }
            else if(check.key === userChampIDs[4].toString())
            {
                champNames.push(check.id);
            }
        }
    }).catch(err => err);
}

function getRankedInfo(id)
{
    return axios.get("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY)
    .then(response =>
        {
            console.log("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY);
            console.log(response.data);

            if (response.data.length !== 0)
            {
                rankedInfo.push(response.data[0].tier);
                rankedInfo.push(response.data[0].rank);
                rankedInfo.push(response.data[0].leaguePoints);
                rankedInfo.push(response.data[0].wins);
                rankedInfo.push(response.data[0].losses);
            }
        }
        ).catch(err => err);
}

app.get('/past5Games', async (req, res) => {

    const playerName = req.query.username;
    // PUUID
    const playerData = await getPlayerDATA(playerName);
    const PUUID = playerData.puuid;
    const playerChamp = await getPlayerCHAMP(PUUID);
    console.log(playerData.id);
    const rankInfo = await getRankedInfo(playerData.id);

    const work = await getChampfromID(PUUID);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;

    // API call to find list of game IDs
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)
        // list of game ID strings

    // console.log(gameIDs);



    var matchDataArray = [];
    for (let i = 0; i < gameIDs.length - 15; i++)
    {
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        // console.log("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY);
        matchDataArray.push(matchData);
    }
    var allDATA = [userInfo, matchDataArray, userChampIDs, champNames, rankedInfo];
    res.json(allDATA);
    for (let i = 0; i < 6; i++)
    {
        userInfo.pop();
        userChampIDs.pop();
        champNames.pop();
        rankedInfo.pop();
    }
})


app.listen(4000, function () {
    console.log("Server started on port 4000")
})