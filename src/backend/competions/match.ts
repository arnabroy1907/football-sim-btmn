import { MatchScore, TeamData } from "../types";

const selfFactorLim = 3;
const oppFactorLim = 3;

const getTeamScore = (homeTeamXps: number, awayTeamXPS: number) => {
    const selfFactor = Math.floor(Math.random() * (selfFactorLim)) + 2; // 2,3,4
    const oppFactor = Math.floor(Math.random() * (oppFactorLim)) + 1; // 1,2,3
    const netXps = (selfFactor * homeTeamXps) + (oppFactor * (homeTeamXps - awayTeamXPS));

    if (netXps < 150) return 0;
    
    if (netXps >= 150 && netXps < 200)
        return Math.floor(Math.random() * 2); // 0 or 1
    
    if (netXps >= 200 && netXps < 250)
        return Math.floor(Math.random() * 2) + 1; // 1 or 2

    if (netXps >= 250 && netXps < 300)
        return Math.floor(Math.random() * 2) + 2; // 2 or 3

    if (netXps >= 300 && netXps < 440)
        return Math.floor(Math.random() * 2) + 3; // 3 or 4

    return Math.floor(Math.random() * 4) + 4; // 4, 5, 6, 7
};

export const getMatchResult = (teamHome: TeamData, teamAway: TeamData): MatchScore => {
    const homeScore = getTeamScore(teamHome.xps, teamAway.xps);
    const awayScore = getTeamScore(teamAway.xps, teamHome.xps);

    return {
        home: {
            team: teamHome,
            score: homeScore
        },
        away: {
            team: teamAway,
            score: awayScore
        },
        scoreLine: `${teamHome.short} ${homeScore} - ${awayScore} ${teamAway.short}`
    };
};