import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import PlacesRecommend from '../../components/PlacesRecommend/PlacesRecommend';
import MenuSearchBar from '../../components/SearchBar/MenuSearchBar';
import PosterMenuOld from '../../components/PosterMenu/PosterMenuOld';
import FujiSan from './fujiSan.jpg';
import FujiGif from './9uEA.gif';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import LoginButton from '../../components/Header/LoginButton';
import PosterMenu from '../../components/PosterMenu/PosterMenu';

const OutSide = styled.div``;
const SearchContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Poster = styled.div`
    background-image: url(${FujiSan});
    background-size: cover;
    height: 100vh;
    padding-top: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const Login = styled.div`
    z-index: 2;
`;
const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Logo = styled.div`
    font-family: 'Prata';
    font-style: normal;
    font-weight: 400;
    font-size: 45px;
    line-height: 81px;
    text-align: center;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default function Home() {
    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    // const { signIn, logOut } = useContext(AuthContext);
    return (
        <>
            <OutSide>
                <Poster>
                    <Login>
                        <LoginButton></LoginButton>
                    </Login>
                    <LogoContainer>
                        <Logo>HANABI</Logo>
                    </LogoContainer>
                    <PosterMenu></PosterMenu>
                </Poster>
                <SearchContainer></SearchContainer>
                <PlacesRecommend></PlacesRecommend>
            </OutSide>
        </>
    );
}
