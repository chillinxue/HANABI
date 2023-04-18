import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OutSide = styled.div`
    width: 100%;
    border: 1px black;
`;

const Nav = styled.div`
    width: 100%;
    height: 60px;
    border: 1px black;
    display: flex;
    justify-content: space-between;
`;
const BarContainer = styled.div`
    display: flex;
`;
const Logo = styled.div`
    height: 30px;
    border: 1px black;
`;
const HomeContainer = styled.div``;
const TripsContainer = styled.div``;
const BlogContainer = styled.div``;
const FavoritesContainer = styled.div``;
const LoginContainer = styled.div``;

export default function Header() {
    return (
        <>
            <OutSide>
                {/* <PosterContainer> */}
                <Nav>
                    <Logo>HANABi🎇</Logo>
                    <BarContainer>
                        <HomeContainer Link to='/Home'>
                            <button>
                                <Link to='/home'></Link>
                                Home
                            </button>
                        </HomeContainer>
                        <TripsContainer to='/Trips'>
                            <button to='/Trips'>Trips</button>
                        </TripsContainer>
                        <BlogContainer>
                            <button>BLOG</button>
                        </BlogContainer>
                        <FavoritesContainer>
                            <button>Favorites</button>
                        </FavoritesContainer>
                        <LoginContainer to='/GoogleLogin'>
                            <button>Login</button>
                        </LoginContainer>
                    </BarContainer>
                </Nav>
            </OutSide>
        </>
    );
}
