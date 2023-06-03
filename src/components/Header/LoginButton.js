import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;
const LoginInsideContainer = styled.div`
    display: flex;
    border: 1px solid black;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const LogInButton = styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
`;
const LogOutButton = styled.div`
    width: 45px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;
export default function LoginButton() {
    const { userUID } = useContext(AuthContext);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);

    const isLoggedIn = useMemo(() => !!userUID, [userUID]);

    const handleLogin = () => {
        signIn(auth, provider);
    };

    const handleLogout = () => {
        logOut(auth);
    };
    return (
        <>
            <LoginContainer to='/GoogleLogin'>
                <LoginInsideContainer>
                    {isLoggedIn ? (
                        <LogOutButton onClick={handleLogout}>Logout</LogOutButton> // 顯示登出按鈕
                    ) : (
                        <LogInButton onClick={handleLogin}>Login</LogInButton> // 顯示登入按鈕
                    )}
                </LoginInsideContainer>
            </LoginContainer>
        </>
    );
}
