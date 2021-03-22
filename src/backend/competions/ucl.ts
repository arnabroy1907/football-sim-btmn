import { PotData, TeamData, UCLGroupStage } from "../types";

const random = (teamArray: TeamData[]) => {
    return teamArray[Math.floor(Math.random() * teamArray.length)];
};

const remove = (teamArray: TeamData[], teamData: TeamData) => {
    return teamArray.filter(team => team.id !== teamData.id);
};

const shuffleGroup = (groupArray: TeamData[]) => {
    let backupGroupArr: TeamData[] = [...groupArray];
    let newArr: TeamData[] = [];

    for (let i = 0; i < groupArray.length; i++) {
        let team = random(backupGroupArr);
        newArr.push(team);
        backupGroupArr = remove(backupGroupArr, team);
    }

    return newArr;
};

const shuffleFullGroup = (fullGroup: TeamData[][]) => {
    let backupFullGroup: TeamData[][] = [...fullGroup];
    let newFullGroup: TeamData[][] = [];

    let groupList = [0, 1, 2, 3, 4, 5, 6, 7];
    while (groupList.length > 0) {
        let index = groupList[Math.floor(Math.random() * groupList.length)];
        groupList = groupList.filter(gp => gp !== index);
        newFullGroup.push(shuffleGroup(backupFullGroup[index]));
    }

    return newFullGroup;
};

const mainLoopLimiter = 200;
const subLoopLimiter = 100;

export const getUCLGroupStage = (potData: PotData) => {
    try {
        // Validate pot input
        if (potData.pot1.length !== 8 || potData.pot2.length !== 8 || potData.pot3.length !== 8 || potData.pot4.length !== 8) {
            throw new Error('Invalid Pot data');
        }

        const potBackup = { ...potData };
        let fullIterCount = 1;
        let finalGroup: TeamData[][] = [];

        while (fullIterCount < mainLoopLimiter) {

            let pt1 = potBackup.pot1;
            let pt2 = potBackup.pot2;
            let pt3 = potBackup.pot3;
            let pt4 = potBackup.pot4;
            let needRedo = false;

            finalGroup = [];

            for (let i = 0; i < 8; i++) {

                let groupArr: TeamData[] = [];
                let groupLgArr: string[] = [];

                // get team from pot 1
                const teamPt1 = random(pt1);
                pt1 = remove(pt1, teamPt1);
                groupArr.push(teamPt1);
                groupLgArr.push(teamPt1.leagueId);

                // get team from pot 2
                let loopCounter = 0;
                while(loopCounter < subLoopLimiter) {
                    const teamPt2 = random(pt2);
                    if (!groupLgArr.includes(teamPt2.leagueId)) {
                        groupArr.push(teamPt2);
                        groupLgArr.push(teamPt2.leagueId);
                        pt2 = remove(pt2, teamPt2);
                        loopCounter = subLoopLimiter * 2;
                    } else {
                        loopCounter++;
                    }
                }

                // get team from pot 3
                loopCounter = 0;
                while(loopCounter < subLoopLimiter) {
                    const teamPt3 = random(pt3);
                    if (!groupLgArr.includes(teamPt3.leagueId)) {
                        groupArr.push(teamPt3);
                        groupLgArr.push(teamPt3.leagueId);
                        pt3 = remove(pt3, teamPt3);
                        loopCounter = subLoopLimiter * 2;
                    } else {
                        loopCounter++;
                    }
                }

                // get team from pot 4
                loopCounter = 0;
                while(loopCounter < subLoopLimiter) {
                    const teamPt4 = random(pt4);
                    if (!groupLgArr.includes(teamPt4.leagueId)) {
                        groupArr.push(teamPt4);
                        groupLgArr.push(teamPt4.leagueId);
                        pt4 = remove(pt4, teamPt4);
                        loopCounter = subLoopLimiter * 2;
                    } else {
                        loopCounter++;
                    }
                }

                if (groupArr.length !== 4) {
                    needRedo = true;
                    break;
                } else {
                    finalGroup.push(groupArr);
                }

            }

            if (needRedo || finalGroup.length !== 8) {
                fullIterCount++;
            } else {
                break;
            }
        }

        if (finalGroup.length !== 8) throw new Error('Loop Limit Exceeded');

        const newFinalGroup = shuffleFullGroup(finalGroup);

        const finalGroupStage: UCLGroupStage = {
            groupA: newFinalGroup[0],
            groupB: newFinalGroup[1],
            groupC: newFinalGroup[2],
            groupD: newFinalGroup[3],
            groupE: newFinalGroup[4],
            groupF: newFinalGroup[5],
            groupG: newFinalGroup[6],
            groupH: newFinalGroup[7]
        };

        return {
            totalIterations: fullIterCount,
            finalGroupStage: finalGroupStage
        };
    } catch(err) {
        console.log(err);
        return null;
    }
}; 