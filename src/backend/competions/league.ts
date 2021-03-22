import { LeagueData, LeagueSchedule, MatchupData, PointsTableData, RoundScoreData, TeamData, TeamPoints } from "../types";

const rotateArray = (arr: TeamData[]) => {
    let newArr: TeamData[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (i < (arr.length - 1)) {
            newArr.push(arr[i + 1]);
        } else {
            newArr.push(arr[0]);
        }
    }

    return newArr;
};

const shuffleMatchArr = (matchRoundArray: MatchupData[][]) => {
    let newArray: MatchupData[][] = [];
    while(matchRoundArray.length > 0) {
        let index = Math.floor(Math.random() * matchRoundArray.length);
        const matchRound = matchRoundArray[index];
        newArray.push(matchRound);
        matchRoundArray = matchRoundArray.filter(matchRoundData => matchRoundData !== matchRound);
    }

    return newArray;
};

export const createLeagueSchedule = (league: LeagueData, shuffleRounds: boolean = false) => {

    const teamListArr: TeamData[] = league.teams;

    const pairsArrHome = [];

    let subArr = teamListArr.slice(1);
    for (let i = 0; i < teamListArr.length - 1; i++) {
        let mainArr: TeamData[] = [];
        mainArr.push(teamListArr[0]);

        subArr = rotateArray(subArr);
        subArr.forEach(elem => {
            mainArr.push(elem);
        });

        let mainArr1st = mainArr.slice(0, mainArr.length/2);
        let mainArr2nd = mainArr.slice(mainArr.length/2);

        mainArr = mainArr1st.concat(mainArr2nd.reverse());

        for (let j = 0; j < mainArr.length/2; j++) {
            pairsArrHome.push([mainArr[j], mainArr[j + mainArr.length/2]]);
        }

    }

    let roundSize = teamListArr.length/2;

    let roundsArrayHome: MatchupData[][] = [];
    let roundsArrayAway: MatchupData[][] = [];

    for (let i = 0; i <= pairsArrHome.length - roundSize; i = i + roundSize) {
        let subArray = pairsArrHome.slice(i, i + roundSize);
        const matchArrayHome: MatchupData[] = [];
        const matchArrayAway: MatchupData[] = [];

        subArray.forEach(data => {
            const switchHomeAwayNum = Math.floor(Math.random() * 2);
            if (switchHomeAwayNum === 0) {
                matchArrayHome.push({
                    homeTeam: data[0],
                    awayTeam: data[1]
                });

                matchArrayAway.push({
                    homeTeam: data[1],
                    awayTeam: data[0]
                });
            } else {
                matchArrayHome.push({
                    homeTeam: data[1],
                    awayTeam: data[0]
                });

                matchArrayAway.push({
                    homeTeam: data[0],
                    awayTeam: data[1]
                });
            }
        });

        roundsArrayHome.push(matchArrayHome);
        roundsArrayAway.push(matchArrayAway);
    }

    if (shuffleRounds) {
        roundsArrayHome = shuffleMatchArr(roundsArrayHome);
        roundsArrayAway = shuffleMatchArr(roundsArrayAway);
    }

    const finalSchedule: LeagueSchedule = {
        totalRounds: (roundsArrayHome.length + roundsArrayAway.length),
        rounds: [
            ...roundsArrayHome,
            ...roundsArrayAway
        ]
    };

    return finalSchedule;
};

export const getInitialPointsTable = (league: LeagueData) => {
    let pointsTable: PointsTableData = {
        rounds: 0,
        table: {},
        standings: []
    };
    const standingsArr: TeamPoints[] = [];

    league.teams.forEach(team => {
        const teamPointsData: TeamPoints = {
            team: team,
            played: 0,
            points: 0,
            win: 0,
            lost: 0,
            draw: 0,
            goalFor: 0,
            goalAgainst: 0,
            goalDef: 0,
            home: {
                goalFor: 0,
                goalAgainst: 0,
                goalDef: 0,
            },
            away: {
                goalFor: 0,
                goalAgainst: 0,
                goalDef: 0,
            }
        }
        pointsTable = {
            ...pointsTable,
            table: {
                ...pointsTable.table,
                [team.name]: teamPointsData
            }
        };
        standingsArr.push(teamPointsData);
    });

    pointsTable = {
        ...pointsTable,
        standings: standingsArr
    };

    return pointsTable;
}

const sortLeagueTable = (leagueStanding: TeamPoints[]) => {
    let refStandings = leagueStanding;

    for (let i = 0; i < refStandings.length - 1; i++) {
        for (let j = i + 1; j < refStandings.length; j++) {
            // sort by point
            if (refStandings[i].points < refStandings[j].points) {
                const tempTeam = refStandings[i];
                refStandings[i] = refStandings[j];
                refStandings[j] = tempTeam;
            }
            // if points same
            else if (refStandings[i].points === refStandings[j].points) {
                // sort by goal diff
                if (refStandings[i].goalDef < refStandings[j].goalDef) {
                    const tempTeam = refStandings[i];
                    refStandings[i] = refStandings[j];
                    refStandings[j] = tempTeam;
                }
                // if goal diff also same
                else if (refStandings[i].goalDef === refStandings[j].goalDef) {
                    // sort by goal scored
                    if (refStandings[i].goalFor < refStandings[j].goalFor) {
                        const tempTeam = refStandings[i];
                        refStandings[i] = refStandings[j];
                        refStandings[j] = tempTeam;
                    }
                }
            }
        }
    }

    return refStandings;
};

export const updateTablePerRound = (leagueTable: PointsTableData, roundScore: RoundScoreData) => {
    roundScore.scores.forEach(score => {
        const homeScore = score.home;
        const awayScore = score.away;

        // update table for home team
        let homeTabData: TeamPoints = leagueTable.table[homeScore.team.name];
        homeTabData = {
            ...homeTabData,
            played: homeTabData.played + 1,
            goalFor: homeTabData.goalFor + homeScore.score,
            goalAgainst: homeTabData.goalAgainst + awayScore.score,
            goalDef: homeTabData.goalDef + homeScore.score - awayScore.score,
            home: {
                goalFor: homeTabData.home.goalFor + homeScore.score,
                goalAgainst: homeTabData.home.goalAgainst + awayScore.score,
                goalDef: homeTabData.home.goalDef + homeScore.score - awayScore.score
            }
        };

        // home team match desicion
        if (homeScore.score > awayScore.score) {
            homeTabData = {
                ...homeTabData,
                win: homeTabData.win + 1,
                points: homeTabData.points + 3
            };
        }
        else if (homeScore.score < awayScore.score) {
            homeTabData = {
                ...homeTabData,
                lost: homeTabData.lost + 1
            };
        }
        else {
            homeTabData = {
                ...homeTabData,
                draw: homeTabData.draw + 1,
                points: homeTabData.points + 1
            };
        }

        leagueTable.table[homeScore.team.name] = homeTabData;

        // update table for away team
        let awayTabData: TeamPoints = leagueTable.table[awayScore.team.name];
        awayTabData = {
            ...awayTabData,
            played: awayTabData.played + 1,
            goalFor: awayTabData.goalFor + awayScore.score,
            goalAgainst: awayTabData.goalAgainst + homeScore.score,
            goalDef: awayTabData.goalDef + awayScore.score - homeScore.score,
            away: {
                goalFor: awayTabData.home.goalFor + awayScore.score,
                goalAgainst: awayTabData.home.goalAgainst + homeScore.score,
                goalDef: awayTabData.home.goalDef + awayScore.score - homeScore.score
            }
        };

        // home team match desicion
        if (homeScore.score < awayScore.score) {
            awayTabData = {
                ...awayTabData,
                win: awayTabData.win + 1,
                points: awayTabData.points + 3
            };
        }
        else if (homeScore.score > awayScore.score) {
            awayTabData = {
                ...awayTabData,
                lost: awayTabData.lost + 1
            };
        }
        else {
            awayTabData = {
                ...awayTabData,
                draw: awayTabData.draw + 1,
                points: awayTabData.points + 1
            };
        }

        leagueTable.table[awayScore.team.name] = awayTabData;
    });


    let standingsArr: TeamPoints[] = [];
    Object.getOwnPropertyNames(leagueTable.table).forEach(teamName => {
        standingsArr.push(leagueTable.table[teamName]);
    });

    // get sorted standings
    standingsArr = sortLeagueTable(standingsArr);

    leagueTable = {
        ...leagueTable,
        rounds: roundScore.roundNumber,
        standings: standingsArr
    };

    return leagueTable;
};