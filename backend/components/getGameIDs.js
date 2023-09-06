const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getGameIDs = (PUUID) => {
  return axios
    .get(
      "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
        PUUID +
        "/ids?api_key=" +
        API_KEY,
    )
    .then((response) => {
      return [
        response.data[0],
        response.data[1],
        response.data[2],
        response.data[3],
        response.data[4],
      ];
    })
    .catch((err) => err);
}

module.exports = {
  getGameIDs,
};
