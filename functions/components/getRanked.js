/* eslint-disable */
const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getRanked = (ID) => {
  return axios
    .get(
      "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
        ID +
        "?api_key=" +
        API_KEY,
    )
    .then((response) => {

      let soloInfo = {};
      let flexInfo = {};

      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].queueType == "RANKED_SOLO_5x5") {

          soloInfo.tier = response.data[i].tier;
          soloInfo.rank = response.data[i].rank;
          soloInfo.LP = response.data[i].leaguePoints;
          soloInfo.wins = response.data[i].wins;
          soloInfo.losses = response.data[i].losses;
        } else if (response.data[i].queueType == "RANKED_FLEX_SR") {

          flexInfo.tier = response.data[i].tier;
          flexInfo.rank = response.data[i].rank;
          flexInfo.LP = response.data[i].leaguePoints;
          flexInfo.wins = response.data[i].wins;
          flexInfo.losses = response.data[i].losses;
        }
      }

      if (Object.keys(soloInfo).length != 5) {

        soloInfo.tier = "Unranked";
        soloInfo.rank = "";
        soloInfo.LP = "0";
        soloInfo.wins = "0";
        soloInfo.losses = "0";

      }
      if (Object.keys(flexInfo).length != 5) {
        flexInfo.tier = "Unranked";
        flexInfo.rank = "";
        flexInfo.LP = "0";
        flexInfo.wins = "0";
        flexInfo.losses = "0";
      }

      return {soloInfo, flexInfo};
    })
    .catch((err) => err);
}

module.exports = {
  getRanked,
};
