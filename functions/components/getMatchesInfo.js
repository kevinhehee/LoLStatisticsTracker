/* eslint-disable */
const axios = require("axios");
const API_KEY = process.env.LOL_API_KEY;

const getMatchesInfo = async (gameIDs) => {
  let matchesDataList = [];

  for (let i = 0; i < gameIDs.length; i++) {
    let matchData = await axios
      .get(
        "https://americas.api.riotgames.com/lol/match/v5/matches/" +
          gameIDs[i] +
          "?api_key=" +
          API_KEY,
      )
      .then((response) => {
        matchesDataList.push(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  }
  return matchesDataList;
}

module.exports = {
  getMatchesInfo,
};
