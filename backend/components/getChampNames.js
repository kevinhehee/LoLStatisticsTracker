const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getChampNames = (champ1, champ2, champ3) => {
  return axios
    .get(
      "https://ddragon.leagueoflegends.com/cdn/13.15.1/data/en_US/champion.json",
    )
    .then((response) => {
      // prettier-ignore
      let allchamps = ["Aatrox","Ahri","Akali","Akshan","Alistar","Amumu","Anivia","Annie","Aphelios","Ashe","AurelionSol","Azir","Bard","Belveth","Blitzcrank","Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko","Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Gwen","Hecarim","Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","KSante","Kaisa","Kalista","Karma","Karthus","Kassadin","Katarina","Kayle","Kayn","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lillia","Lissandra","Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","Milio","MissFortune","Mordekaiser","Morgana","Nami","Naafiri","Nasus","Nautilus","Neeko","Nidalee","Nilah","Nocturne","Nunu","Olaf","Orianna","Ornn","Pantheon","Poppy","Pyke","Qiyana","Quinn","Rakan","Rammus","RekSai","Rell","Renata","Renekton","Rengar","Riven","Rumble","Ryze","Samira","Sejuani","Senna","Seraphine","Sett","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka","Swain","Sylas","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate","Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vex","Vi","Viego","Viktor","Vladimir","Volibear","Warwick","MonkeyKing","Xayah","Xerath","XinZhao","Yasuo","Yone","Yorick","Yuumi","Zac","Zed","Zeri","Ziggs","Zilean","Zoe","Zyra"];
      let returnthis = [];

      for (let i = 0; i < allchamps.length; i++) {
        var check = response.data.data[allchamps[i]];

        if (check.key === champ1.toString()) {
          returnthis.push(check.id);
          returnthis.push(check.name);
          break;
        }
      }

      for (let i = 0; i < allchamps.length; i++) {
        var check = response.data.data[allchamps[i]];

        if (check.key === champ2.toString()) {
          returnthis.push(check.id);
          returnthis.push(check.name);
          break;
        }
      }

      for (let i = 0; i < allchamps.length; i++) {
        var check = response.data.data[allchamps[i]];

        if (check.key === champ3.toString()) {
          returnthis.push(check.id);
          returnthis.push(check.name);
          break;
        }
      }

      return [
        returnthis[0],
        returnthis[1],
        returnthis[2],
        returnthis[3],
        returnthis[4],
        returnthis[5],
      ];
    })
    .catch((err) => err);
}

module.exports = {
  getChampNames,
};
