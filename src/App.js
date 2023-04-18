import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import PlacesRecommend from './components/PlacesRecommend/PlacesRecommend';
import { Outlet } from 'react-router-dom';

const OutSide = styled.div``;

function App() {
    return (
        <>
            <OutSide>
                <Header></Header>
                <PlacesRecommend></PlacesRecommend>
                <Outlet />
            </OutSide>
        </>
    );
}

export default App;
