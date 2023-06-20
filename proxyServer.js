var express = require('express');
var cors = require('cors');
const axios = require('axios');

var app = express();

app.use(cors());

// const [userInfo, setuserInfo] = useState("");
let userInfo = [];
let userChampIDs = [];
let champNames = [];
const API_KEY = "RGAPI-15a90f8f-7d0e-40c7-a8e3-319e9f4bcc76";

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

function getPlayerCHAMP(PUUID) 
{
    return axios.get("https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + PUUID + "?api_key=" + API_KEY)
        .then(response => {
            userChampIDs.push(response.data[0].championId);
            userChampIDs.push(response.data[1].championId);
            userChampIDs.push(response.data[2].championId);
        }).catch(err => err);
}

function getChampfromID(PUUID)
{            
    return axios.get("http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json")
    .then(response => 
    {
        let allchamps = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KaiSa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","MissFortune","Mordekaiser","Morgana","Nami","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","MonkeyKing","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"];
        var arr = response.data.data;
        // console.log(response.data.data);
        // userChampIDs[0] = toString(userChampIDs[0]);
        // userChampIDs[1] = toString(userChampIDs[1]);
        // userChampIDs[2] = toString(userChampIDs[2]);
        // userChampIDs[0].toString();
        // userChampIDs[1].toString();
        // userChampIDs[2].toString();

        // console.log(userChampIDs[0].toString());
        // console.log(userChampIDs[1]);
        // console.log(userChampIDs[2]);

        

        // console.log(response.data.data.Katarina.key === userChampIDs[0].toString());

        // var object = eval('(' + allchamps[0] + ')');
        for (let i = 0; i < 3; i++)
        {
            if (response.data.data.Aatrox.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Aatrox.name);
            }
            if (response.data.data.Ahri.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ahri.name);
            }
            if (response.data.data.Akali.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Akali.name);
            }
            if (response.data.data.Akshan.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Akshan.name);
            }
            if (response.data.data.Alistar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Alistar.name);
            }
            if (response.data.data.Amumu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Amumu.name);
            }
            if (response.data.data.Anivia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Anivia.name);
            }
            if (response.data.data.Annie.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Annie.name);
            }
            if (response.data.data.Aphelios.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Aphelios.name);
            }
            if (response.data.data.Ashe.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ashe.name);
            }
            if (response.data.data.AurelionSol.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.AurelionSol.name);
            }
            if (response.data.data.Azir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Azir.name);
            }
            if (response.data.data.Bard.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Bard.name);
            }
            if (response.data.data.Belveth.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Belveth.name);
            }
            if (response.data.data.Blitzcrank.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Blitzcrank.name);
            }
            if (response.data.data.Brand.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Brand.name);
            }
            if (response.data.data.Braum.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Braum.name);
            }
            if (response.data.data.Caitlyn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Caitlyn.name);
            }
            if (response.data.data.Camille.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Camille.name);
            }
            if (response.data.data.Cassiopeia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Cassiopeia.name);
            }
            if (response.data.data.Chogath.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Chogath.name);
            }
            if (response.data.data.Corki.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Corki.name);
            }
            if (response.data.data.Darius.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Darius.name);
            }
            if (response.data.data.Diana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Diana.name);
            }
            if (response.data.data.Draven.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Draven.name);
            }
            if (response.data.data.DrMundo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.DrMundo.name);
            }
            if (response.data.data.Ekko.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ekko.name);
            }
            if (response.data.data.Elise.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Elise.name);
            }
            if (response.data.data.Evelynn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Evelynn.name);
            }
            if (response.data.data.Ezreal.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ezreal.name);
            }
            if (response.data.data.Fiddlesticks.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fiddlesticks.name);
            }
            if (response.data.data.Fiora.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fiora.name);
            }
            if (response.data.data.Fizz.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fizz.name);
            }
            if (response.data.data.Galio.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Galio.name);
            }
            if (response.data.data.Gangplank.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gangplank.name);
            }
            if (response.data.data.Garen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Garen.name);
            }
            if (response.data.data.Gnar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gnar.name);
            }
            if (response.data.data.Gragas.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gragas.name);
            }
            if (response.data.data.Graves.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Graves.name);
            }
            if (response.data.data.Gwen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gwen.name);
            }
            if (response.data.data.Hecarim.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Hecarim.name);
            }
            if (response.data.data.Heimerdinger.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Heimerdinger.name);
            }
            if (response.data.data.Illaoi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Illaoi.name);
            }
            if (response.data.data.Irelia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Irelia.name);
            }
            if (response.data.data.Ivern.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ivern.name);
            }
            if (response.data.data.Janna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Janna.name);
            }
            if (response.data.data.JarvanIV.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.JarvanIV.name);
            }
            if (response.data.data.Jax.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jax.name);
            }
            if (response.data.data.Jayce.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jayce.name);
            }
            if (response.data.data.Jhin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jhin.name);
            }
            if (response.data.data.Jinx.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jinx.name);
            }
            if (response.data.data.Kaisa.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kaisa.name);
            }
            if (response.data.data.Kalista.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kalista.name);
            }
            if (response.data.data.Karma.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Karma.name);
            }
            if (response.data.data.Karthus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Karthus.name);
            }
            if (response.data.data.Kassadin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kassadin.name);
            }
            if (response.data.data.Katarina.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Katarina.name);
            }
            if (response.data.data.Kayle.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kayle.name);
            }
            if (response.data.data.Kayn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kayn.name);
            }
            if (response.data.data.Kennen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kennen.name);
            }
            if (response.data.data.Khazix.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Khazix.name);
            }
            if (response.data.data.Kindred.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kindred.name);
            }
            if (response.data.data.Kled.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kled.name);
            }
            if (response.data.data.KogMaw.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.KogMaw.name);
            }
            if (response.data.data.Leblanc.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Leblanc.name);
            }
            if (response.data.data.LeeSin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.LeeSin.name);
            }
            if (response.data.data.Leona.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Leona.name);
            }
            if (response.data.data.Lillia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lillia.name);
            }
            if (response.data.data.Lissandra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lissandra.name);
            }
            if (response.data.data.Lucian.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lucian.name);
            }
            if (response.data.data.Lulu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lulu.name);
            }
            if (response.data.data.Lux.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lux.name);
            }
            if (response.data.data.Malphite.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Malphite.name);
            }
            if (response.data.data.Malzahar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Malzahar.name);
            }
            if (response.data.data.Maokai.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Maokai.name);
            }
            if (response.data.data.MasterYi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MasterYi.name);
            }
            if (response.data.data.MissFortune.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MissFortune.name);
            }
            if (response.data.data.Mordekaiser.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Mordekaiser.name);
            }
            if (response.data.data.Morgana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Morgana.name);
            }
            if (response.data.data.Nami.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nami.name);
            }
            if (response.data.data.Nasus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nasus.name);
            }
            if (response.data.data.Nautilus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nautilus.name);
            }
            if (response.data.data.Neeko.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Neeko.name);
            }
            if (response.data.data.Nidalee.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nidalee.name);
            }
            if (response.data.data.Nilah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nilah.name);
            }
            if (response.data.data.Nocturne.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nocturne.name);
            }
            if (response.data.data.Nunu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nunu.name);
            }
            if (response.data.data.Olaf.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Olaf.name);
            }
            if (response.data.data.Orianna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Orianna.name);
            }
            if (response.data.data.Ornn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ornn.name);
            }
            if (response.data.data.Pantheon.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Pantheon.name);
            }
            if (response.data.data.Poppy.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Poppy.name);
            }
            if (response.data.data.Pyke.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Pyke.name);
            }
            if (response.data.data.Qiyana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Qiyana.name);
            }
            if (response.data.data.Quinn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Quinn.name);
            }
            if (response.data.data.Rakan.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rakan.name);
            }
            if (response.data.data.Rammus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rammus.name);
            }
            if (response.data.data.RekSai.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.RekSai.name);
            }
            if (response.data.data.Rell.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rell.name);
            }
            if (response.data.data.Renata.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Renata.name);
            }
            if (response.data.data.Renekton.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Renekton.name);
            }
            if (response.data.data.Rengar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rengar.name);
            }
            if (response.data.data.Riven.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Riven.name);
            }
            if (response.data.data.Rumble.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rumble.name);
            }
            if (response.data.data.Ryze.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ryze.name);
            }
            if (response.data.data.Samira.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Samira.name);
            }
            if (response.data.data.Sejuani.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sejuani.name);
            }
            if (response.data.data.Senna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Senna.name);
            }
            if (response.data.data.Seraphine.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Seraphine.name);
            }
            if (response.data.data.Sett.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sett.name);
            }
            if (response.data.data.Shaco.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shaco.name);
            }
            if (response.data.data.Shen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shen.name);
            }
            if (response.data.data.Shyvana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shyvana.name);
            }
            if (response.data.data.Singed.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Singed.name);
            }
            if (response.data.data.Sion.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sion.name);
            }
            if (response.data.data.Sivir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sivir.name);
            }
            if (response.data.data.Skarner.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Skarner.name);
            }
            if (response.data.data.Sona.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sona.name);
            }
            if (response.data.data.Soraka.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Soraka.name);
            }
            if (response.data.data.Swain.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Swain.name);
            }
            if (response.data.data.Sylas.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sylas.name);
            }
            if (response.data.data.Syndra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Syndra.name);
            }
            if (response.data.data.TahmKench.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.TahmKench.name);
            }
            if (response.data.data.Taliyah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Taliyah.name);
            }
            if (response.data.data.Talon.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Talon.name);
            }
            if (response.data.data.Taric.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Taric.name);
            }
            if (response.data.data.Teemo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Teemo.name);
            }
            if (response.data.data.Thresh.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Thresh.name);
            }
            if (response.data.data.Tristana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Tristana.name);
            }
            if (response.data.data.Trundle.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Trundle.name);
            }
            if (response.data.data.Tryndamere.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Tryndamere.name);
            }
            if (response.data.data.TwistedFate.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.TwistedFate.name);
            }
            if (response.data.data.Twitch.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Twitch.name);
            }
            if (response.data.data.Udyr.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Udyr.name);
            }
            if (response.data.data.Urgot.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Urgot.name);
            }
            if (response.data.data.Varus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Varus.name);
            }
            if (response.data.data.Vayne.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vayne.name);
            }
            if (response.data.data.Veigar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Veigar.name);
            }
            if (response.data.data.Velkoz.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Velkoz.name);
            }
            if (response.data.data.Vex.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vex.name);
            }
            if (response.data.data.Vi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vi.name);
            }
            if (response.data.data.Viego.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Viego.name);
            }
            if (response.data.data.Viktor.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Viktor.name);
            }
            if (response.data.data.Vladimir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vladimir.name);
            }
            if (response.data.data.Volibear.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Volibear.name);
            }
            if (response.data.data.Warwick.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Warwick.name);
            }
            if (response.data.data.MonkeyKing.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MonkeyKing.name);
            }
            if (response.data.data.Xayah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Xayah.name);
            }
            if (response.data.data.Xerath.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Xerath.name);
            }
            if (response.data.data.XinZhao.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.XinZhao.name);
            }
            if (response.data.data.Yasuo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yasuo.name);
            }
            if (response.data.data.Yone.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yone.name);
            }
            if (response.data.data.Yorick.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yorick.name);
            }
            if (response.data.data.Yuumi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yuumi.name);
            }
            if (response.data.data.Zac.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zac.name);
            }
            if (response.data.data.Zed.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zed.name);
            }
            if (response.data.data.Zeri.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zeri.name);
            }
            if (response.data.data.Ziggs.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ziggs.name);
            }
            if (response.data.data.Zilean.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zilean.name);
            }
            if (response.data.data.Zoe.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zoe.name);
            }
            if (response.data.data.Zyra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zyra.name);
            }


            
        }
        // console.log(eval('obj=allchamps[0]'));
        // console.log(obj);
        // console.log("before");
        // console.log(response.data.data.obj);
        // console.log(response.data.data.Aatrox.key);
        // console.log("after");
        // console.log(allchamps.length);
        // for (let i = 0; i < allchamps.length; i++)
        // {
        //     // var obj = eval(allchamps[i]);
        //     if (response.data.data.eval(allchamps[i]).key === userChampIDs[0])
        //     {
        //         console.log("found");
        //     }
        // }

    }).catch(err => err);
}

app.get('/past5Games', async (req, res) => {

    const playerName = req.query.username;
    // PUUID
    const playerData = await getPlayerDATA(playerName);
    const PUUID = playerData.puuid;
    const playerChamp = await getPlayerCHAMP(PUUID);

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
        matchDataArray.push(matchData);
    }
    var allDATA = [userInfo, matchDataArray, userChampIDs, champNames];
    res.json(allDATA);
    for (let i = 0; i < 3; i++)
    {
        userInfo.pop();
        userChampIDs.pop();
        champNames.pop();
    }
})


app.listen(4000, function () {
    console.log("Server started on port 4000")
})