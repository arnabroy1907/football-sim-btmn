import { LeagueData, TeamData } from "../types";

// Portugese League Teams
export const porto: TeamData = {
    id: 'pt-01',
    name: 'FC Porto',
    short: 'POR',
    leagueId: 'pt',
    xps: 84
};

export const benfica: TeamData = {
    id: 'pt-02',
    name: 'Benfica',
    short: 'BEN',
    leagueId: 'pt',
    xps: 80
};

export const sporting: TeamData = {
    id: 'pt-03',
    name: 'Sporting CP',
    short: 'SPR',
    leagueId: 'pt',
    xps: 78
};

// Dutch League teams
export const ajax: TeamData = {
    id: 'nd-01',
    name: 'Ajax',
    short: 'AJX',
    leagueId: 'nd',
    xps: 84
};

export const psv: TeamData = {
    id: 'nd-02',
    name: 'PSV Eindhoven',
    short: 'PSV',
    leagueId: 'nd',
    xps: 80
};

// Russian League teams
export const cska: TeamData = {
    id: 'ru-01',
    name: 'CSKA Moskow',
    short: 'CSK',
    leagueId: 'ru',
    xps: 80
};

export const spartak: TeamData = {
    id: 'ru-02',
    name: 'Spartak Moskow',
    short: 'SPA',
    leagueId: 'ru',
    xps: 74
};

export const zenith: TeamData = {
    id: 'ru-03',
    name: 'Zenith',
    short: 'ZEN',
    leagueId: 'ru',
    xps: 74
};

// Other Randoms
export const galatasaray: TeamData = {
    id: 'tu-01',
    name: 'Galatasaray',
    short: 'GAL',
    leagueId: 'tu',
    xps: 82
};

export const fenerbahce: TeamData = {
    id: 'tu-01',
    name: 'Fenerbahce',
    short: 'FNB',
    leagueId: 'tu',
    xps: 74
};

export const shakhtar: TeamData = {
    id: 'uk-01',
    name: 'Shakhtar Donetsk',
    short: 'SHK',
    leagueId: 'uk',
    xps: 78
};

export const olympiacos: TeamData = {
    id: 'gr-01',
    name: 'Olympiacos',
    short: 'OLY',
    leagueId: 'gr',
    xps: 77
};

export const brugge: TeamData = {
    id: 'bl-01',
    name: 'Club Brugge',
    short: 'BRU',
    leagueId: 'bl',
    xps: 74
};

export const salzburg: TeamData = {
    id: 'au-01',
    name: 'RB Salzburg',
    short: 'RBS',
    leagueId: 'au',
    xps: 74
};

export const europeRest: LeagueData = {
    name: 'Rest of Europe',
    id: 'xx',
    teams: [
        porto,
        benfica,
        sporting,
        ajax,
        psv,
        cska,
        spartak,
        zenith,
        galatasaray,
        fenerbahce,
        shakhtar,
        olympiacos,
        brugge,
        salzburg
    ]
};