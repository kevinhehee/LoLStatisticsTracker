/* eslint-disable */
const functions = require('firebase-functions');
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors({ origin: 'https://league-statistics-tracker.web.app'}));

const getUserInfo = require("./components/getUserInfo");
const { getPlayerCHAMP } = require("./components/getPlayerCHAMP.js");
const { getChampNames } = require("./components/getChampNames.js");
const { getRanked } = require("./components/getRanked.js");
const { getGameIDs } = require("./components/getGameIDs.js");
const { getMatchesInfo } = require("./components/getMatchesInfo.js");
const { getGeneralStats } = require("./components/getGeneralStats.js");

app.get("", async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'https://league-statistics-tracker.web.app','https://league-statistics-tracker.firebaseapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
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


exports.search = functions.https.onRequest(app);