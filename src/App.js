import 'normalize.css';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
// import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
// import { AuthContext } from './Context/AuthContext';
import { AuthContextProvider } from './Context/AuthContext';

const OutSide = styled.div`
    font-family: 'Noto Sans JP';
`;
const GlobalStyle = createGlobalStyle`
  * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Noto Sans JP', sans-serif;
    }
`;

function App() {
    return (
        <AuthContextProvider>
            <GlobalStyle />
            <OutSide>
                <Outlet />
            </OutSide>
        </AuthContextProvider>
    );
}

export default App;
