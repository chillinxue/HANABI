import React, { useState, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import LoginButton from './LoginButton';

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
    justify-content: center;
    align-items: center;
`;
export default function Header() {
    return (
        <>
            <OutSide>
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
                                    <LoginButton></LoginButton>
                                </LoginInsideContainer>
                            </LoginContainer>
                        </Login>
                    </BarContainer>
                </Nav>
            </OutSide>
        </>
    );
}
