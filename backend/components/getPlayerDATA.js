const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

function getPlayerDATA(playerName) {
  return axios
    .get(
      "https://na1.api.riotgames.com" +
        "/lol/summoner/v4/summoners/by-name/" +
        playerName +
        "?api_key=" +
        API_KEY,
    )
    .then((response) => {
      if ((playerName = null)) {
        return null;
      }
      // return response.data;
      return [
        response.data.name,
        response.data.summonerLevel,
        response.data.profileIconId,
        response.data.id,
        response.data.puuid,
      ];
    })
    .catch((err) => err);
}

module.exports = {
  getPlayerDATA,
};
