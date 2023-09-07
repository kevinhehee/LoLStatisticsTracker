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
      .then((response) => response.data);
    matchesDataList.push(matchData);
  }

  return [
    matchesDataList[0],
    matchesDataList[1],
    matchesDataList[2],
    matchesDataList[3],
    matchesDataList[4],
  ];
}

module.exports = {
  getMatchesInfo,
};
