

const getGeneralStats = (PUUID, matchDataArray) => {

  let data;
  let totalMinions = 0;
  let totalTime = 0;
  let totalControlWards = 0;
  let totalVisionScore = 0;

  let summRiftCounter = 0;
  let summRiftTime = 0;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      data = matchDataArray[i].info.participants[j];

      if (data.puuid == PUUID) {
        if (matchDataArray[i].info.gameMode == "CLASSIC") {
          summRiftCounter++;
          summRiftTime += data.timePlayed;
        }

        totalMinions += data.totalMinionsKilled + data.neutralMinionsKilled;
        totalTime += data.timePlayed;
        totalControlWards += data.visionWardsBoughtInGame;
        totalVisionScore += data.visionScore;
      }
    }
  }
  let averageCS = (totalMinions / (totalTime / 60)).toFixed(1);
  let averageVisionScore = totalVisionScore / summRiftCounter;
  let averageControlWards = totalControlWards / summRiftCounter;

  if (summRiftCounter == 0) {
    averageControlWards = 0;
    averageVisionScore = 0;
  }
  console.log([averageCS, averageVisionScore, averageControlWards]);

  return [averageCS, averageVisionScore, averageControlWards];
}


module.exports = {
  getGeneralStats,
};
