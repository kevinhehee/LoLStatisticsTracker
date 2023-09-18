const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { db } = require('../firebase.js')
const { FieldValue } = require('firebase-admin/firestore')

app.use(cors());
app.use(express.json());

const { getUserInfo } = require("./components/getUserInfo.js");
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
let champNames = {}

app.get("/search", async (req, res) => {
  // console.log("COUNT");

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



// const DATA = {
//   user: userInfo,
//   matches: matchDataArray,
//   champs: userChamps,
//   champNames: champNames,
//   soloRankedInfo: soloRankedInfo,
//   flexRankedInfo: flexRankedInfo,
//   averageMatchData: averageMatchData,
// };

// const users = {
//   'qEZPZ': 'noob',
//   'blueboy13': 'noob'

// }

app.get('/users', async (req, res) => {
  // res.status(200).send(users);
})

app.post('search/addPlayer', async (req, res) => {
  const { username, info} = req.body;
  const userRef = db.collection('users').doc('data')
  const res2 = await userRef.set({
    [username]: info
  }, { merge: true })
  // res.status(200).send(users);
})


// app.patch('/updatePlayerInfo', async (req, res) => {
//   JSON.stringify(users);
//   const { username, newStatus } = req.body;
//   const userRef = db.collection('users').doc('data')
//   const res2 = await userRef.set({
//     [username]: newStatus
//   })
//   res.status(200).send(users);
// })

// app.delete('/delete', async (req, res) => {
//   // JSON.stringify(users);
//   jsobn
//   const { username } = req.body;
//   const userRef = db.collection('users').doc('data')
//   const res2 = await userRef.set({
//     [username]: FieldValue.delete()
//   })
//   res.status(200).send(users);
// })


app.listen(4000, function () {
  console.log("Server started on port 4000");
});