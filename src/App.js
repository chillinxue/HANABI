import 'normalize.css';
import React, { useContext } from 'react';
import styled from 'styled-components';
// import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
// import { AuthContext } from './Context/AuthContext';
import { AuthContextProvider } from './Context/AuthContext';
const OutSide = styled.div``;

function App() {
    // const { userUID } = useContext(AuthContext);
    // console.log(userUID);

    return (
        <AuthContextProvider>
            <OutSide>
                {/* <Header></Header> */}
                <Outlet />
            </OutSide>
        </AuthContextProvider>
    );
}

export default App;
