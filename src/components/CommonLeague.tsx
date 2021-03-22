import React, { useState, useEffect } from 'react';
import { createLeagueSchedule, getInitialPointsTable, updateTablePerRound } from '../backend/competions/league';
import { getMatchResult } from '../backend/competions/match';
import { LeagueData, LeagueSchedule, MatchScore, MatchupData, PointsTableData, RoundScoreData } from '../backend/types';
import st from 'styled-components';
import footballBg from '../assets/ucl-bg.jpeg';

interface CommonLeagueProps {
    league: LeagueData;
    topTier: number;
    logo: any;
}

interface LeagueResultsMatrix {
    [key: string]: string;
}


// ------------------------------[ STYLING BLOCK ]--------------------------------------------

interface LeagueColumnProp {
    bgColor?: string;
}

const LeagueWrapper = st.div`
    padding: 1rem;
    padding-top: 4rem;
    font-size: 16px;
    @media only screen and (max-width: 599px) {
        font-size: 10px;
    }
    background-image: url(${footballBg});
    background-size: contain;
    color: #fff;
    background-color: #15001f;
    padding-bottom: 10rem;
`;

const LeagueHeader = st.div`
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 5rem;
        max-height: 6rem;
        margin: 0 1rem;
    }
    span {
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        font-style: italic;
    }
    @media only screen and (max-width: 599px) {
        img {
            width: 3rem;
            max-height: 3.6rem;
            margin: 0 1rem;
        }
        span {
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            font-style: italic;
        }
    }
`;

const LeagueTableWrapper = st.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    opacity: 0.8;
`;

const LeagueTable = st.div`
    display: flex;
    margin-bottom: 2rem;
    border: 3px solid #226;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    box-shadow: 0 0 10px 6px #000;
`;

const LeagueTableColumns = st.div`
    display: flex;
    flex-direction: column;
`;

const LeagueTableColumnHeader = st.span`
    text-align: center;
    padding: 0.5rem;
    font-weight: 700;
    border-bottom: 1px solid #226;
    @media only screen and (max-width: 599px) {
        padding: 0.25rem;
    }
    background-color: #9090d070;
`;

const LeagueTableColumnElem = st(LeagueTableColumnHeader)`
    font-weight: 500;
    border: 1px solid #dde;
    background-color: ${(prop: LeagueColumnProp) => prop.bgColor ? prop.bgColor : '#fafffa'};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const RoundsContainer = st.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
`;

const RoundsWrapper = st.div`
    border: 2px solid #226;
    margin: 2rem 0.5rem;
    width: 360px;
    border-radius: 5px;
    box-shadow: 0 0 10px 6px #000;
    height: fit-content;
    background-color: #fff;
    opacity: 0.8;
    color: #000;
    @media only screen and (max-width: 599px) {
        width: 320px;
    }
`;

const RoundsHeader = st.div`
    padding: 0.5rem;
    font-weight: 700;
    border-bottom: 1px solid #226;
    text-align: center;
    background-color: #9090d070;
    @media only screen and (max-width: 599px) {
        padding: 0.25rem;
    }
`;

const RoundMatchesWrapper = st.div`
    overflow: hidden;
    transition: height linear 150ms;
`;

const RoundMatches = st.div`
    width: 100%;
    display: flex;
    align-items: stretch;
`;

const RoundTeamSpan = st.div`
    flex: 2;
    padding: 0.5rem;
    border: 1px solid #dde;
    font-weight: 500;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    @media only screen and (max-width: 599px) {
        padding: 0.25rem;
    }
`;

const RoundScoreSpan = st.div`
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #dde;
    text-align: center;
    font-weight: 500;
`;

const LeagueOpsCenter = st.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #040D49aa;
    box-shadow 0 -2px 5px #000;
    z-index: 2;
`;

const LeagueOpsButton = st.div`
    background-color: #ddd;
    color: #040E49;
    font-weight: 700;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 6px 4px #000;
    margin: 1rem;
    cursor: pointer;
    transition: linear 200ms;
    &:hover {
        background-color: #fff;
    }
`;

// -------------------------------------------------------------------------------------------


const getLeageueResultObj = (leagueResults: LeagueResultsMatrix, scoreList: MatchScore[]) => {
    let leagueResMat: LeagueResultsMatrix = {
        ...leagueResults
    };

    for (let i = 0; i < scoreList.length; i++) {
        const score = scoreList[i];
        leagueResMat = {
        ...leagueResMat,
        [`${score.home.team.id}-${score.away.team.id}`]: `${score.home.score} - ${score.away.score}`
        };
    }

    return leagueResMat;
};

export const CommonLeague = (props: CommonLeagueProps) => {
    const [leagueSchedule, setLeagueSchedule] = useState<LeagueSchedule|null>(null);
    const [leagueTable, setLeagueTable] = useState<PointsTableData|null>(null);
    const [currentRound, setCurrentRound] = useState(0);
    const [leagueResults, setLeagueResults] = useState<LeagueResultsMatrix>({});

    useEffect(() => {
        window.scrollTo(0,0);
        setCurrentRound(0);
        setLeagueResults({});
        setLeagueTable(null);
        setLeagueSchedule(null);

        const leagueScheduleData = createLeagueSchedule(props.league, true);
        setLeagueSchedule(leagueScheduleData);

        const leaguePointsData = getInitialPointsTable(props.league);
        setLeagueTable(leaguePointsData);
    }, [props.league]);


    // Gets result for a single round
    const doRound = (leagueTableData: PointsTableData, round: MatchupData[], roundNumber: number) => {
        window.scrollTo(0,0);

        const scoresList: MatchScore[] = round.map(match => getMatchResult(match.homeTeam, match.awayTeam));
        const roundScoreData: RoundScoreData = {
            roundNumber: roundNumber,
            scores: scoresList
        };

        const newLeagueTable = updateTablePerRound(leagueTableData, roundScoreData);
        const leagueResData = getLeageueResultObj(leagueResults, scoresList);
        setLeagueTable(newLeagueTable);
        setCurrentRound(roundNumber);
        setLeagueResults(leagueResData);
    }
    
    // Gets results for all remaining rounds till the final round
    const doFullLeague = (leagueTableData: PointsTableData, schedule: LeagueSchedule) => {
        window.scrollTo(0,0);

        const initCR = currentRound;
        let roundsArray = schedule.rounds.slice(initCR, schedule.totalRounds - 1);
        let leagResFul: LeagueResultsMatrix = {
            ...leagueResults
        };
        roundsArray.forEach((round, roundNumber) => {
            const scoresList: MatchScore[] = round.map(match => getMatchResult(match.homeTeam, match.awayTeam));
            const roundScoreData: RoundScoreData = {
                roundNumber: initCR + roundNumber + 1,
                scores: scoresList
            };

            const newLeagueTable = updateTablePerRound(leagueTableData, roundScoreData);
            const leagueResData = getLeageueResultObj(leagueResults, scoresList);
            leagResFul = {
                ...leagResFul,
                ...leagueResData
            }
            setLeagueTable(newLeagueTable);
            setCurrentRound(initCR + roundNumber + 1);
        });
        setLeagueResults(leagResFul);
    }

    const getTableRowColor = (id: number, size: number) => {
        if (id === 0) return '#ffff99';
        if (id > 0 && id < props.topTier) return '#ddefff';
        if (id === props.topTier) return '#faeadf';
        if (id > size - 4) return '#faeaea';
        return '#fafaff';
    }

    if (!leagueTable || !leagueSchedule) {
        return null;
    }


    return (
        <LeagueWrapper>
            <LeagueHeader>
                <img src={props.logo} alt={props.league.name}/>
                <span> {props.league.name.toUpperCase()} </span>
            </LeagueHeader>
            <LeagueOpsCenter>
            {(currentRound < leagueSchedule.totalRounds) ? (
                    <LeagueOpsButton
                        onClick={() => {
                            doRound(leagueTable, leagueSchedule.rounds[currentRound], currentRound + 1);
                        }}
                    >
                        { (currentRound < (leagueSchedule.totalRounds - 1)) ? (
                            `Play Match Day ${currentRound + 1}`
                        ) : (
                            `Play Final Match Day`
                        )}
                    </LeagueOpsButton>
                ) : (
                    <LeagueOpsButton
                        onClick={() => {
                            setCurrentRound(0);
                            setLeagueResults({});
                            setLeagueTable(null);
                            setLeagueSchedule(null);

                            const leagueScheduleData = createLeagueSchedule(props.league, true);
                            setLeagueSchedule(leagueScheduleData);

                            const leaguePointsData = getInitialPointsTable(props.league);
                            setLeagueTable(leaguePointsData);
                        }}
                    >
                        Reset
                    </LeagueOpsButton>
                )
            }
            { (currentRound < (leagueSchedule.totalRounds - 1)) &&
                <LeagueOpsButton
                    onClick={() => {
                        doFullLeague(leagueTable, leagueSchedule);
                    }}
                >
                    Skip to Final Match Day
                </LeagueOpsButton>
            }
            </LeagueOpsCenter>
            <LeagueTableWrapper>
            <LeagueTable>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader> &nbsp; </LeagueTableColumnHeader>
                    {leagueTable.standings.map((_team, id) => (
                        <LeagueTableColumnElem
                            key={`rank-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{id + 1}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>Team</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`team-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.team.name}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>Pl</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`pld-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.played}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>W</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`won-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.win}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>T</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`tied-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.draw}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>L</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`lost-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.lost}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>GF/GA</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`gfga-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.goalFor} / {team.goalAgainst}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>GD</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`gd-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.goalDef}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
                <LeagueTableColumns>
                    <LeagueTableColumnHeader>Pts</LeagueTableColumnHeader>
                    {leagueTable.standings.map((team, id) => (
                        <LeagueTableColumnElem
                            key={`pts-${id}`}
                            bgColor={getTableRowColor(id, leagueTable.standings.length)}
                        >{team.points}</LeagueTableColumnElem>
                    ))}
                </LeagueTableColumns>
            </LeagueTable>
            { (currentRound < leagueSchedule.totalRounds) &&
                <RoundsWrapper>
                    <RoundsHeader>
                        Coming round - Match Day {currentRound + 1}
                    </RoundsHeader>
                    <RoundMatchesWrapper>
                    {leagueSchedule.rounds[currentRound].map((match, ids) => {
                        const result = leagueResults[`${match.homeTeam.id}-${match.awayTeam.id}`];
                        return (
                            <RoundMatches key={`match-${currentRound}-${ids}`}>
                                <RoundTeamSpan> {match.homeTeam.name} </RoundTeamSpan>
                                <RoundScoreSpan>
                                    { result } 
                                </RoundScoreSpan>
                                <RoundTeamSpan> {match.awayTeam.name} </RoundTeamSpan>
                            </RoundMatches>
                        );
                    })}
                    </RoundMatchesWrapper>
                </RoundsWrapper>
            }
            { (currentRound > 0) &&
                <RoundsWrapper>
                    <RoundsHeader>
                        Previous round - Match Day {currentRound}
                    </RoundsHeader>
                    <RoundMatchesWrapper>
                    {leagueSchedule.rounds[currentRound - 1].map((match, ids) => {
                        const result = leagueResults[`${match.homeTeam.id}-${match.awayTeam.id}`];
                        return (
                            <RoundMatches key={`match-${currentRound - 1}-${ids}`}>
                                <RoundTeamSpan> {match.homeTeam.name} </RoundTeamSpan>
                                <RoundScoreSpan>
                                    { result } 
                                </RoundScoreSpan>
                                <RoundTeamSpan> {match.awayTeam.name} </RoundTeamSpan>
                            </RoundMatches>
                        );
                    })}
                    </RoundMatchesWrapper>
                </RoundsWrapper>
            }
            </LeagueTableWrapper>
            <h2 style={{textAlign: 'center'}}> League Results </h2>
            <RoundsContainer>
                {leagueSchedule.rounds.map((round, id) => {
                    return (
                    <RoundsWrapper key={`md-${id}`}>
                        <RoundsHeader>
                            Match Day {id + 1}
                        </RoundsHeader>
                        <RoundMatchesWrapper>
                        {round.map((match, ids) => {
                            const result = leagueResults[`${match.homeTeam.id}-${match.awayTeam.id}`];
                            return (
                                <RoundMatches key={`match-${id}-${ids}`}>
                                    <RoundTeamSpan> {match.homeTeam.name} </RoundTeamSpan>
                                    <RoundScoreSpan>
                                        { result } 
                                    </RoundScoreSpan>
                                    <RoundTeamSpan> {match.awayTeam.name} </RoundTeamSpan>
                                </RoundMatches>
                            );
                        })}
                        </RoundMatchesWrapper>
                    </RoundsWrapper>
                )})}
            </RoundsContainer>
        </LeagueWrapper>
    )
};
