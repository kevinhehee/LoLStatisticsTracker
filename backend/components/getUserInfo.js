const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getUserInfo = (playerName) => {
  return axios
    .get(
      "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        playerName +
        "?api_key=" +
        API_KEY,
    )
    .then((response) => {
      if ((playerName = null)) {
        return null;
      }
      return {
        name: response.data.name,
        summonerLevel: response.data.summonerLevel,
        profileIconId: response.data.profileIconId,
        id: response.data.id,
        puuid: response.data.puuid,
        code: response.code
      };
    })
    .catch((err) => err);
}

module.exports = {
  getUserInfo,
};
