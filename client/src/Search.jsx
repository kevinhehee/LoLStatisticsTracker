import "./styles/App.css";
import "./styles/navigation.css"
import MatchHistory from "./components/MatchHistory/MatchHistory";
import ChampMastery from "./components/ChampMastery/ChampMastery";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'



const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState({data : ""});
  const [isCoolDownActive, setCoolDownActive] = useState(false);
  const [coolDownTime, setCoolDownTime] = useState(0);
  const { username } = useParams();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleSearch = async () => {
    navigate(`/search/user/${searchText}`);
  }

  useEffect(() => {
    getPlayerGames();
  }, [username])
  
  const getPlayerGames = async (event) => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}find`, {
          params: { username: username},
        });
        // console.log("GOING");
        // console.log(response);
        
        // setCount(count + 1);
        // console.log(count);

          if (isCoolDownActive === true)
          {
            // console.log("cool down active");
            return;
          }
          setCoolDownActive(true);
          setCoolDownTime(5);

          const interval = setInterval(() => {
            setCoolDownTime(prevTime => prevTime - 1);
          }, 1000);

          setTimeout(() => {
            setCoolDownActive(false);
            clearInterval(interval);
            setCoolDownTime(0);
          }, 5000);

          setDataList(response.data);

          const userName = response.data?.user?.name;
          const tier = response.data?.soloRankedInfo?.tier;
          const rank = response.data?.soloRankedInfo?.rank;

            if (userName)
            {
              const post = await axios.post(`${process.env.REACT_APP_API_URL}search/addPlayer`, {
              "username" : userName,
              "info" : tier + " " + rank
              });
            }
            else
            {
              console.log("info missing");
            }
      } catch(error) {
          console.log(error);
        }
      }
      
      
    
    console.log(dataList);

  return (
    <>
      <div class="navigation-container">
        <a>Home</a>
      </div>
      
      <div className="background">
        <div className="pageContainer">
          <div className="page">
            {
              dataList.user && Object.keys(dataList.user) && (
                <div className="allRanksContainer">
                  <div className="userInfoContainer">
                    <div className="searchContainerFound">
                      <h1>WOOOO Player Search</h1>
                      <input
                        className="searchbar"
                        type="text"
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search"
                      ></input>
                      <button className="searchbutton" onClick={handleSearch} disabled={isCoolDownActive}>
                        Search
                      </button>
                      {isCoolDownActive && <span>Cooldown: {coolDownTime} seconds</span>}

                      <p>Made with 💖 by Kevin He</p>
                    </div>

                    <div className="champSplashContainer">
                      <div className="userIconContainer">
                        <div className="userIcon">
                          <h1>{dataList.user.name}</h1>

                          <h2>Level {dataList.user.summonerLevel}</h2>
                        </div>
                        <img
                          className="userIconImg"
                          src={
                            "http://ddragon.leagueoflegends.com/cdn/13.18.1/img/profileicon/" +
                            dataList.user.profileIconId +
                            ".png"
                          }
                          alt="profile icon"
                        ></img>

                        {dataList.soloRankedInfo.rank !== "Unranked" ? (
                          <div className="rankInfoContainer">
                            <div className="rankIcon">
                              <h2>Solo/Duo</h2>
                              <img
                                width="160px"
                                height="160px"
                                src={require(
                                  "./images/emblem-" +
                                    dataList.soloRankedInfo.tier.toLowerCase() +
                                    ".png",
                                )}
                                alt="rankemblem"
                              ></img>
                            </div>

                            <div className="rankStats">
                              <h1>
                                {dataList.soloRankedInfo.tier} {dataList.soloRankedInfo.rank} {dataList.soloRankedInfo.LP}{" "}
                                LP
                              </h1>
                              <h2>
                                {dataList.soloRankedInfo.wins}W {dataList.soloRankedInfo.losses}L
                              </h2>
                            </div>
                          </div>
                        ) : (
                          <div className="rankInfoContainer">
                            <div className="rankIcon">
                              <img
                                width="240px"
                                height="240px"
                                src={require(
                                  "./images/emblem-" +
                                  dataList.soloRankedInfo.tier.toLowerCase() +
                                    ".png",
                                )}
                                alt="rankemblem"
                              ></img>
                            </div>
                            <div className="rankStats">
                              <h1>{dataList.soloRankedInfo.tier}</h1>
                              <h2>
                              {dataList.soloRankedInfo.wins}W {dataList.soloRankedInfo.losses}L
                              </h2>
                              <h2>Solo/Duo</h2>
                            </div>
                          </div>
                        )}

                        {Object.keys(dataList.flexRankedInfo).length !== 0 &&
                        dataList.flexRankedInfo.tier !== "Unranked" ? (
                          <div className="rankInfoContainer">
                            <div className="rankIcon">
                              <h2>Flex</h2>
                              <img
                                width="160px"
                                height="160px"
                                src={require(
                                  "./images/emblem-" +
                                  dataList.flexRankedInfo.tier.toLowerCase() +
                                    ".png",
                                )}
                                alt="rankemblem"
                              ></img>
                            </div>
                            <div className="rankStats">
                              <h1>
                                {dataList.flexRankedInfo.tier} {dataList.flexRankedInfo.rank} {dataList.flexRankedInfo.LP}{" "}
                                LP
                              </h1>
                              <h2>
                                {dataList.flexRankedInfo.wins}W {dataList.flexRankedInfo.losses}L
                              </h2>
                              <h2>
                                {(
                                  (dataList.flexRankedInfo.wins /
                                    (dataList.flexRankedInfo.wins + dataList.flexRankedInfo.losses)) *
                                  100
                                ).toFixed(2)}
                                % Win Rate
                              </h2>
                            </div>
                          </div>
                        ) : (
                          <div className="rankInfoContainer">
                            <div className="rankIcon">
                              <img
                                width="160px"
                                height="160px"
                                src={require(
                                  "./images/emblem-" +
                                    dataList.flexRankedInfo.tier.toLowerCase() +
                                    ".png",
                                )}
                                alt="rankemblem"
                              ></img>
                            </div>
                            <div className="rankStats">
                              <h1>{dataList.flexRankedInfo.tier}</h1>
                              <h2>
                                {dataList.flexRankedInfo.wins}W {dataList.flexRankedInfo.losses}L
                              </h2>
                              <h2>Flex</h2>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* <div className = "HighestMastery">
                        <h1 style = {{textAlign: 'center'}} >Highest Mastery</h1>
                      </div> */}

                      <ChampMastery champNames = {dataList.champNames} champs = {dataList.champs}/>
                    </div>

                    {/* <div>
                        Replace with CS per minute, 
                    </div> */}
                  </div>
                </div>
              )
            }

            {dataList.user && Object.keys(dataList.user).length !== 0 ? (
              <MatchHistory matches = {dataList.matches} />
            ) : null
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
