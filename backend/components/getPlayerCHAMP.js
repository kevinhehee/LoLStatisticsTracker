const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getPlayerCHAMP = (ID) => {
  return axios
    .get(
      "https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
        ID +
        "/top?api_key=" +
        API_KEY,
    )
    .then((response) => {
      return [
        response.data[0].championId,
        response.data[0].championPoints,
        response.data[1].championId,
        response.data[1].championPoints,
        response.data[2].championId,
        response.data[2].championPoints,
      ];
    })
    .catch((err) => err);
}

module.exports = {
  getPlayerCHAMP,
};
