import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';

const OutSide = styled.div``;

function App() {
    return (
        <>
            <OutSide>
                <Header></Header>
                <Outlet />
            </OutSide>
        </>
    );
}

export default App;
