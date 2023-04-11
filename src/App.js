import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import MapSearch from './components/Map/MapSearch';
import Test from './pages/Test';

const OutSide = styled.div``;

function App() {
    return (
        <>
            <OutSide>
                <Header></Header>
                <MapSearch></MapSearch>
                <Test></Test>
            </OutSide>
        </>
    );
}

export default App;
