export interface MatchScore {
    home: {
        team: TeamData;
        score: number;
    };
    away: {
        team: TeamData;
        score: number;
    };
    scoreLine: string;
}

export interface TeamData {
    id: string;
    name: string;
    short: string;
    xps: number;
    leagueId: string;
}

export interface TeamPoints {
    team: TeamData;
    played: number;
    points: number;
    win: number;
    lost: number;
    draw: number;
    goalFor: number;
    goalAgainst: number;
    goalDef: number;
    home: {
        goalFor: number;
        goalAgainst: number;
        goalDef: number;
    };
    away: {
        goalFor: number;
        goalAgainst: number;
        goalDef: number;
    };
}

export interface PointsTableData {
    rounds: number;
    table: {
        [key: string]: TeamPoints;
    }
    standings: TeamPoints[]
}

export interface LeagueData {
    name: string;
    id: string;
    teams: TeamData[];
}

export interface PotData {
    pot1: TeamData[];
    pot2: TeamData[];
    pot3: TeamData[];
    pot4: TeamData[];
}

export interface UCLGroupStage {
    groupA: TeamData[];
    groupB: TeamData[];
    groupC: TeamData[];
    groupD: TeamData[];
    groupE: TeamData[];
    groupF: TeamData[];
    groupG: TeamData[];
    groupH: TeamData[];
}

export interface MatchupData {
    homeTeam: TeamData,
    awayTeam: TeamData
}

export interface LeagueSchedule {
    totalRounds: number;
    rounds: MatchupData[][]
}

export interface RoundScoreData {
    roundNumber: number;
    scores: MatchScore[];
}