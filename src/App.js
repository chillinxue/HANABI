import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';

const OutSide = styled.div``;

function App() {
    return (
        <>
            <OutSide>
                <Header></Header>
            </OutSide>
        </>
    );
}

export default App;
