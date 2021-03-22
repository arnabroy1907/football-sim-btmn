import React, { useEffect, useState } from 'react';
import st from 'styled-components';
import { UCLDefaulPots } from '../backend/data/ucl';
import { PotData, TeamData } from '../backend/types';
import uclBg from '../assets/ucl-bg.jpeg';

// ------------------------------[ STYLING BLOCK ]--------------------------------------------

const UclContainer = st.div`
    padding: 4rem 1rem 10rem 1rem;
    background-image: url(${uclBg});
    background-size: contain;
`;

const UclPotListWrapper = st.div`
    display: flex;
    flex-flow: wrap;
    justify-content: center;
`;

const UclPotWrapper = st.div`
    background-color: #ffffffaa;
    margin: 1rem 1.5rem;
    text-transform: uppercase;
`;

const UclPotHeader = st.div`
    text-align: center;
    padding: 0.5rem;
    background-color: #172e58;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
`;

const UclPotBody = st.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 700;
    div {
        width: 100%;
        text-align: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid #90b0e0;

        span {
            padding: 0 1rem;
        }
    }
`;

// -------------------------------------------------------------------------------------------

const defaultPotData: PotData = UCLDefaulPots;

export const UCLView = () => {
    const [potData, setPotData] = useState<PotData|null>(null);

    useEffect(() => {
        setPotData(defaultPotData);
    }, []);

    if (!potData) {
        return null;
    }

    return (
        <UclContainer>
            <UclPotListWrapper>
                {
                    Object.getOwnPropertyNames(potData).map((key, id) => (
                        <UclPotWrapper key={`pot-${id}`}>
                            <UclPotHeader> Pot {id + 1} </UclPotHeader>
                            <UclPotBody>
                                {   // @ts-ignore
                                    potData[key].map((team: TeamData, ids: number) => (
                                        <div key={`${id}-${ids}`}>
                                            <span> {team.name} </span>
                                        </div>
                                    ))
                                }
                            </UclPotBody>
                        </UclPotWrapper>
                    ))
                }
            </UclPotListWrapper>
        </UclContainer>
    )
};
