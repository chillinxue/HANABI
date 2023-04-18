import React from 'react';
import styled from 'styled-components';

const OutSide = styled.div``;
const RecommendContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px black;
    gap: 20px;
    margin: 20px;
`;
const TokyoContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
`;
const FujiContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
`;
const OsakaContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
`;
const KyotoContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
`;
const NaraContainer = styled.div`
    width: 200px;
    height: 220px;
    border: 1px solid black;
`;

export default function PlacesRecommend() {
    return (
        <>
            <OutSide>
                <RecommendContainer>
                    <TokyoContainer>Tokyo</TokyoContainer>
                    <FujiContainer>Fuji</FujiContainer>
                    <OsakaContainer>Osaka</OsakaContainer>
                    <KyotoContainer>Kyoto</KyotoContainer>
                    <NaraContainer>Nara</NaraContainer>
                </RecommendContainer>
            </OutSide>
        </>
    );
}
