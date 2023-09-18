/* eslint-disable */
const functions = require('firebase-functions');
var express = require("express");
var cors = require("cors");
var app = express();
const { db } = require('./firebase.js');
// const { FieldValue } = require('firebase-admin/firestore');

app.use(cors({ origin: 'https://league-statistics-tracker.web.app'}));
// app.use(express.json());

const getUserInfo = require("./components/getUserInfo");
const { getPlayerCHAMP } = require("./components/getPlayerCHAMP.js");
const { getChampNames } = require("./components/getChampNames.js");
const { getRanked } = require("./components/getRanked.js");
const { getGameIDs } = require("./components/getGameIDs.js");
const { getMatchesInfo } = require("./components/getMatchesInfo.js");
const { getGeneralStats } = require("./components/getGeneralStats.js");

  let userInfo = {};
  let userChamps = {};
  let soloRankedInfo = {};
  let flexRankedInfo = {};
  let matchDataArray = [];
  let averageMatchData = {};

app.get("", async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'https://league-statistics-tracker.web.app','https://league-statistics-tracker.firebaseapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  

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
app.use(cors({ origin: 'https://league-statistics-tracker.web.app'}));

app.post('/addPlayer', async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', 'https://league-statistics-tracker.web.app','https://league-statistics-tracker.firebaseapp.com/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const { username, info} = req.body;
  const userRef = db.collection('users').doc('data')
  const res2 = await userRef.set({
    [username]: info
  }, { merge: true })
  // res.status(200).send(users);
})

exports.find = functions.https.onRequest(app);