var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();

app.use(cors());

const { getPlayerDATA } = require("./components/getPlayerDATA.js");
const { getPlayerCHAMP } = require("./components/getPlayerCHAMP.js");
const { getChampNames } = require("./components/getChampNames.js");
const { getRanked } = require("./components/getRanked.js");
const { getGameIDs } = require("./components/getGameIDs.js");
const { getMatchesInfo } = require("./components/getMatchesInfo.js");
const { getGeneralStats } = require("./components/getGeneralStats.js");





app.get("/past5Games", async (req, res) => {

  let userInfo = [];
  let userChampIDs = [];
  let champNames = [];
  let soloRankedInfo = [];
  let flexRankedInfo = [];
  let arenaRankedInfo = [];
  let matchDataArray = [];
  let averageMatchData = [];


  const playerName = req.query.username;
  userInfo = await getPlayerDATA(playerName);

  const ID = userInfo[3];
  const PUUID = userInfo[4];

  userChampIDs = await getPlayerCHAMP(ID);

  champNames = await getChampNames(
    userChampIDs[0],
    userChampIDs[2],
    userChampIDs[4],
  );

  rankInfo = await getRanked(ID);

  soloRankedInfo = rankInfo[0];
  flexRankedInfo = rankInfo[1];

  gameIDs = await getGameIDs(PUUID);

  matchDataArray = await getMatchesInfo(gameIDs);

  averageMatchData = getGeneralStats(PUUID, matchDataArray);

  var allDATA = [
    userInfo,
    matchDataArray,
    userChampIDs,
    champNames,
    soloRankedInfo,
    flexRankedInfo,
    averageMatchData,
  ];

  res.json(allDATA);

  for (let i = 0; i < 6; i++) {
    userInfo.pop();
    matchDataArray.pop();
    userChampIDs.pop();
    champNames.pop();
    soloRankedInfo.pop();
    flexRankedInfo.pop();
    rankInfo.pop();
    averageMatchData.pop();
  }

  // console.log(allDATA);
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
