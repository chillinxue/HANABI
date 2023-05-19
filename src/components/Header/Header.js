import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const OutSide = styled.div`
    width: 100%;
    background-color: #fafafa;
    position: fixed;
    top: 0;
    z-index: 2;
`;

const Nav = styled.div`
    width: 100%;
    height: 47px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const BarContainer = styled.div`
    display: flex;

    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-right: 40px;
`;
const HomeContainer = styled.div`
    text-decoration: none;
    padding: 1px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    text-align: center;

    color: #2d2d2d;
`;
const TripsContainer = styled.div``;
const BlogContainer = styled.div``;
const FavoritesContainer = styled.div``;
const Login = styled.div`
    z-index: 2;
`;
const LoginContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    margin-left: 5px;
    cursor: pointer;
`;
const LoginInsideContainer = styled.div`
    display: flex;
    border: 1px solid #2d2d2d;
    justify-content: center;
    align-items: center;
`;
const LogInButton = styled.div`
    color: #2d2d2d;
    border-right: 1px solid #2d2d2d;
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
    color: #2d2d2d;
    width: 45px;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;
export default function Header() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);
    // if (isLogin) {
    //     return <button onClick={logout}>LOGOUsT</button>;
    // }
    // return <button onClick={login}>LOGIN</button>;

    return (
        <>
            <OutSide>
                {/* <PosterContainer> */}
                <Nav>
                    <BarContainer>
                        <Link to='/home' style={{ textDecoration: 'none' }}>
                            <HomeContainer>HOME 主頁</HomeContainer>
                        </Link>
                        <Link to='/Blog' style={{ textDecoration: 'none' }}>
                            <HomeContainer>BLOG ブログ</HomeContainer>
                        </Link>
                        <Link to='/Trips' style={{ textDecoration: 'none' }}>
                            <HomeContainer>PLAN 旅程を計画</HomeContainer>
                        </Link>
                        <Link to='/Profile' style={{ textDecoration: 'none' }}>
                            <HomeContainer>FAVORITES 好き</HomeContainer>
                        </Link>
                        <Login>
                            <LoginContainer to='/GoogleLogin'>
                                <LoginInsideContainer>
                                    <LogInButton onClick={() => signIn(auth, provider)}>Login</LogInButton>
                                    <LogOutButton onClick={() => logOut(auth)}>Logout</LogOutButton>
                                </LoginInsideContainer>
                                {/* <button onClick={() => signIn(auth, provider)}>Login</button>
                <button onClick={() => logOut(auth)}>Logout</button> */}
                            </LoginContainer>
                        </Login>
                    </BarContainer>
                </Nav>
            </OutSide>
        </>
    );
}
