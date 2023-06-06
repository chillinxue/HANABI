import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;
const LoginInsideContainer = styled.div`
    display: flex;
    border: 1px solid white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
const LogInButton = styled.div`
    color: #fafafa;
    border-right: 1px solid white;
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
    color: #fafafa;
    width: 45px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;
export default function LoginButton() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);

    return (
        <>
            <LoginContainer to='/GoogleLogin'>
                <LoginInsideContainer>
                    <LogInButton onClick={() => signIn(auth, provider)}>Login</LogInButton>
                    <LogOutButton onClick={() => logOut(auth)}>Logout</LogOutButton>
                </LoginInsideContainer>
            </LoginContainer>
        </>
    );
}
