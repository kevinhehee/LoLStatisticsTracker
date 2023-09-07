var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();

app.use(cors());

const { getUserInfo } = require("./components/getUserInfo.js");
const { getPlayerCHAMP } = require("./components/getPlayerCHAMP.js");
const { getChampNames } = require("./components/getChampNames.js");
const { getRanked } = require("./components/getRanked.js");
const { getGameIDs } = require("./components/getGameIDs.js");
const { getMatchesInfo } = require("./components/getMatchesInfo.js");
const { getGeneralStats } = require("./components/getGeneralStats.js");

app.get("/search", async (req, res) => {

  let userInfo = {};
  let userChamps = {};
  let soloRankedInfo = {};
  let flexRankedInfo = {};
  let matchDataArray = [];
  let averageMatchData = {};


  const playerName = req.query.username;
  userInfo = await getUserInfo(playerName);

  const ID = userInfo.id;
  const PUUID = userInfo.puuid;

  userChamps = await getPlayerCHAMP(ID);

  champNames = await getChampNames(
    userChamps.champ1ID,
    userChamps.champ2ID,
    userChamps.champ3ID,
  );
  

  rankInfo = await getRanked(ID);

    soloRankedInfo = rankInfo.soloInfo;
    flexRankedInfo = rankInfo.flexInfo;

  gameIDs = await getGameIDs(PUUID);

  matchDataArray = await getMatchesInfo(gameIDs);

  averageMatchData = getGeneralStats(PUUID, matchDataArray);

  let allDATA = {
    user: userInfo,
    matches: matchDataArray,
    champs: userChamps,
    champNames: champNames,
    soloRankedInfo: soloRankedInfo,
    flexRankedInfo: flexRankedInfo,
    averageMatchData: averageMatchData,
  };

  res.json(allDATA);

  console.log(allDATA);
  
});

app.listen(4000, function () {
  console.log("Server started on port 4000");
});