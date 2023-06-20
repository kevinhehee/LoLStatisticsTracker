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
                champNames.push(response.data.data.Aatrox.id);
            }
            if (response.data.data.Ahri.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ahri.id);
            }
            if (response.data.data.Akali.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Akali.id);
            }
            if (response.data.data.Akshan.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Akshan.id);
            }
            if (response.data.data.Alistar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Alistar.id);
            }
            if (response.data.data.Amumu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Amumu.id);
            }
            if (response.data.data.Anivia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Anivia.id);
            }
            if (response.data.data.Annie.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Annie.id);
            }
            if (response.data.data.Aphelios.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Aphelios.id);
            }
            if (response.data.data.Ashe.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ashe.id);
            }
            if (response.data.data.AurelionSol.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.AurelionSol.id);
            }
            if (response.data.data.Azir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Azir.id);
            }
            if (response.data.data.Bard.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Bard.id);
            }
            if (response.data.data.Belveth.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Belveth.id);
            }
            if (response.data.data.Blitzcrank.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Blitzcrank.id);
            }
            if (response.data.data.Brand.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Brand.id);
            }
            if (response.data.data.Braum.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Braum.id);
            }
            if (response.data.data.Caitlyn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Caitlyn.id);
            }
            if (response.data.data.Camille.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Camille.id);
            }
            if (response.data.data.Cassiopeia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Cassiopeia.id);
            }
            if (response.data.data.Chogath.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Chogath.id);
            }
            if (response.data.data.Corki.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Corki.id);
            }
            if (response.data.data.Darius.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Darius.id);
            }
            if (response.data.data.Diana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Diana.id);
            }
            if (response.data.data.Draven.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Draven.id);
            }
            if (response.data.data.DrMundo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.DrMundo.id);
            }
            if (response.data.data.Ekko.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ekko.id);
            }
            if (response.data.data.Elise.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Elise.id);
            }
            if (response.data.data.Evelynn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Evelynn.id);
            }
            if (response.data.data.Ezreal.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ezreal.id);
            }
            if (response.data.data.Fiddlesticks.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fiddlesticks.id);
            }
            if (response.data.data.Fiora.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fiora.id);
            }
            if (response.data.data.Fizz.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Fizz.id);
            }
            if (response.data.data.Galio.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Galio.id);
            }
            if (response.data.data.Gangplank.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gangplank.id);
            }
            if (response.data.data.Garen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Garen.id);
            }
            if (response.data.data.Gnar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gnar.id);
            }
            if (response.data.data.Gragas.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gragas.id);
            }
            if (response.data.data.Graves.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Graves.id);
            }
            if (response.data.data.Gwen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Gwen.id);
            }
            if (response.data.data.Hecarim.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Hecarim.id);
            }
            if (response.data.data.Heimerdinger.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Heimerdinger.id);
            }
            if (response.data.data.Illaoi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Illaoi.id);
            }
            if (response.data.data.Irelia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Irelia.id);
            }
            if (response.data.data.Ivern.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ivern.id);
            }
            if (response.data.data.Janna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Janna.id);
            }
            if (response.data.data.JarvanIV.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.JarvanIV.id);
            }
            if (response.data.data.Jax.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jax.id);
            }
            if (response.data.data.Jayce.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jayce.id);
            }
            if (response.data.data.Jhin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jhin.id);
            }
            if (response.data.data.Jinx.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Jinx.id);
            }
            if (response.data.data.Kaisa.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kaisa.id);
            }
            if (response.data.data.Kalista.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kalista.id);
            }
            if (response.data.data.Karma.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Karma.id);
            }
            if (response.data.data.Karthus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Karthus.id);
            }
            if (response.data.data.Kassadin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kassadin.id);
            }
            if (response.data.data.Katarina.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Katarina.id);
            }
            if (response.data.data.Kayle.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kayle.id);
            }
            if (response.data.data.Kayn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kayn.id);
            }
            if (response.data.data.Kennen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kennen.id);
            }
            if (response.data.data.Khazix.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Khazix.id);
            }
            if (response.data.data.Kindred.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kindred.id);
            }
            if (response.data.data.Kled.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Kled.id);
            }
            if (response.data.data.KogMaw.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.KogMaw.id);
            }
            if (response.data.data.Leblanc.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Leblanc.id);
            }
            if (response.data.data.LeeSin.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.LeeSin.id);
            }
            if (response.data.data.Leona.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Leona.id);
            }
            if (response.data.data.Lillia.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lillia.id);
            }
            if (response.data.data.Lissandra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lissandra.id);
            }
            if (response.data.data.Lucian.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lucian.id);
            }
            if (response.data.data.Lulu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lulu.id);
            }
            if (response.data.data.Lux.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Lux.id);
            }
            if (response.data.data.Malphite.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Malphite.id);
            }
            if (response.data.data.Malzahar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Malzahar.id);
            }
            if (response.data.data.Maokai.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Maokai.id);
            }
            if (response.data.data.MasterYi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MasterYi.id);
            }
            if (response.data.data.MissFortune.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MissFortune.id);
            }
            if (response.data.data.Mordekaiser.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Mordekaiser.id);
            }
            if (response.data.data.Morgana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Morgana.id);
            }
            if (response.data.data.Nami.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nami.id);
            }
            if (response.data.data.Nasus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nasus.id);
            }
            if (response.data.data.Nautilus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nautilus.id);
            }
            if (response.data.data.Neeko.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Neeko.id);
            }
            if (response.data.data.Nidalee.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nidalee.id);
            }
            if (response.data.data.Nilah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nilah.id);
            }
            if (response.data.data.Nocturne.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nocturne.id);
            }
            if (response.data.data.Nunu.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Nunu.id);
            }
            if (response.data.data.Olaf.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Olaf.id);
            }
            if (response.data.data.Orianna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Orianna.id);
            }
            if (response.data.data.Ornn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ornn.id);
            }
            if (response.data.data.Pantheon.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Pantheon.id);
            }
            if (response.data.data.Poppy.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Poppy.id);
            }
            if (response.data.data.Pyke.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Pyke.id);
            }
            if (response.data.data.Qiyana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Qiyana.id);
            }
            if (response.data.data.Quinn.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Quinn.id);
            }
            if (response.data.data.Rakan.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rakan.id);
            }
            if (response.data.data.Rammus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rammus.id);
            }
            if (response.data.data.RekSai.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.RekSai.id);
            }
            if (response.data.data.Rell.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rell.id);
            }
            if (response.data.data.Renata.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Renata.id);
            }
            if (response.data.data.Renekton.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Renekton.id);
            }
            if (response.data.data.Rengar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rengar.id);
            }
            if (response.data.data.Riven.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Riven.id);
            }
            if (response.data.data.Rumble.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Rumble.id);
            }
            if (response.data.data.Ryze.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ryze.id);
            }
            if (response.data.data.Samira.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Samira.id);
            }
            if (response.data.data.Sejuani.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sejuani.id);
            }
            if (response.data.data.Senna.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Senna.id);
            }
            if (response.data.data.Seraphine.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Seraphine.id);
            }
            if (response.data.data.Sett.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sett.id);
            }
            if (response.data.data.Shaco.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shaco.id);
            }
            if (response.data.data.Shen.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shen.id);
            }
            if (response.data.data.Shyvana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Shyvana.id);
            }
            if (response.data.data.Singed.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Singed.id);
            }
            if (response.data.data.Sion.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sion.id);
            }
            if (response.data.data.Sivir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sivir.id);
            }
            if (response.data.data.Skarner.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Skarner.id);
            }
            if (response.data.data.Sona.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sona.id);
            }
            if (response.data.data.Soraka.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Soraka.id);
            }
            if (response.data.data.Swain.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Swain.id);
            }
            if (response.data.data.Sylas.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Sylas.id);
            }
            if (response.data.data.Syndra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Syndra.id);
            }
            if (response.data.data.TahmKench.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.TahmKench.id);
            }
            if (response.data.data.Taliyah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Taliyah.id);
            }
            if (response.data.data.Talon.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Talon.id);
            }
            if (response.data.data.Taric.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Taric.id);
            }
            if (response.data.data.Teemo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Teemo.id);
            }
            if (response.data.data.Thresh.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Thresh.id);
            }
            if (response.data.data.Tristana.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Tristana.id);
            }
            if (response.data.data.Trundle.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Trundle.id);
            }
            if (response.data.data.Tryndamere.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Tryndamere.id);
            }
            if (response.data.data.TwistedFate.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.TwistedFate.id);
            }
            if (response.data.data.Twitch.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Twitch.id);
            }
            if (response.data.data.Udyr.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Udyr.id);
            }
            if (response.data.data.Urgot.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Urgot.id);
            }
            if (response.data.data.Varus.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Varus.id);
            }
            if (response.data.data.Vayne.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vayne.id);
            }
            if (response.data.data.Veigar.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Veigar.id);
            }
            if (response.data.data.Velkoz.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Velkoz.id);
            }
            if (response.data.data.Vex.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vex.id);
            }
            if (response.data.data.Vi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vi.id);
            }
            if (response.data.data.Viego.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Viego.id);
            }
            if (response.data.data.Viktor.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Viktor.id);
            }
            if (response.data.data.Vladimir.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Vladimir.id);
            }
            if (response.data.data.Volibear.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Volibear.id);
            }
            if (response.data.data.Warwick.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Warwick.id);
            }
            if (response.data.data.MonkeyKing.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.MonkeyKing.id);
            }
            if (response.data.data.Xayah.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Xayah.id);
            }
            if (response.data.data.Xerath.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Xerath.id);
            }
            if (response.data.data.XinZhao.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.XinZhao.id);
            }
            if (response.data.data.Yasuo.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yasuo.id);
            }
            if (response.data.data.Yone.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yone.id);
            }
            if (response.data.data.Yorick.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yorick.id);
            }
            if (response.data.data.Yuumi.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Yuumi.id);
            }
            if (response.data.data.Zac.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zac.id);
            }
            if (response.data.data.Zed.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zed.id);
            }
            if (response.data.data.Zeri.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zeri.id);
            }
            if (response.data.data.Ziggs.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Ziggs.id);
            }
            if (response.data.data.Zilean.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zilean.id);
            }
            if (response.data.data.Zoe.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zoe.id);
            }
            if (response.data.data.Zyra.key === userChampIDs[i].toString())
            {
                champNames.push(response.data.data.Zyra.id);
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