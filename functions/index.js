/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const functions = require("firebase-functions");
// const app = require("./proxyServer");

// exports.proxyServer = functions.https.onRequest(app);

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
var express = require("express");
var cors = require("cors");
// require("dotenv").config();
var app = express();

// const corsOptions = {
//   origin: ['https://league-statistics-tracker.web.app', 'http://localhost:3000'], 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));


// app.use(cors({
//   origin: 'https://league-statistics-tracker.web.app'
// }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

// app.options('*', cors());

// const allowedOrigins = [
//   "https://league-statistics-tracker.web.app/",
//   "https://league-statistics-tracker.firebaseapp.com/"
// ]

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) 
//     {
//       callback(null, true);
//     }
//     else
//     {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   optionsSuccessStatus: 200
// }

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

//   console.log("HELLO");

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