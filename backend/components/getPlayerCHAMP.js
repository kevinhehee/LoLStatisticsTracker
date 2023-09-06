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
      return {
        champ1ID : response.data[0].championId,
        champ1Points : response.data[0].championPoints,
        champ2ID : response.data[1].championId,
        champ2Points : response.data[1].championPoints,
        champ3ID : response.data[2].championId,
        champ3Points : response.data[2].championPoints,
      };
    })
    .catch((err) => err);
}

module.exports = {
  getPlayerCHAMP,
};
