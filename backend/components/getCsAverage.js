

function getCsAverage(PUUID, matchDataArray)
{
    // console.log(matchDataArray);
    
    let data;

    let totalMinions = 0;
    let totalTime = 0;
    let totalControlWards = 0;
    let totalVisionScore = 0;

    let summRiftCounter = 0;
    let summRiftTime = 0;

    for (let i = 0; i < 5; i++)
    {
        
        
        for (let j = 0; j < 10; j++)
        {
            data = matchDataArray[i].info.participants[j];
            
            if (data.puuid == PUUID)
            {
                if (matchDataArray[i].info.gameMode == "CLASSIC")
                {
                    summRiftCounter++;
                    summRiftTime += data.timePlayed;
                }
                // console.log(data);
                // console.log(matchDataArray[i].info.participants[j]);
                // console.log("CS: " + data.totalMinionsKilled + " " + data.neutralMinionsKilled);
                // console.log(Math.floor(data.timePlayed / 60) + " " + data.timePlayed % 60);
                totalMinions += data.totalMinionsKilled + data.neutralMinionsKilled;
                totalTime += data.timePlayed;
                // console.log(data.timePlayed / 60 + " " + (data.timePlayed % 60) / 60);
                totalControlWards += data.visionWardsBoughtInGame;
                totalVisionScore += data.visionScore;
                // console.log(data.visionScore);
            }
        }
        
    }
    // console.log(summRiftCounter);

    
    // console.log(totalTime);
    let averageCS = (totalMinions / (totalTime / 60)).toFixed(1);
    let averageVisionScore = totalVisionScore / summRiftCounter;
    let averageControlWards = totalControlWards / summRiftCounter;

    if (summRiftCounter == 0)
    {
        averageControlWards = 0;
        averageVisionScore = 0;
    }
    // console.log([averageCS]);
    // console.log(totalTime / 60 + totalTime % 60)
    console.log([averageCS, averageVisionScore, averageControlWards]);
    
    return [averageCS, averageVisionScore, averageControlWards];
}


// const getCsAverage = (matchDataArray) => {

    

// }












module.exports = {
    getCsAverage
}