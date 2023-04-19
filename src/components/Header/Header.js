import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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
                    <Logo>HANABi🎇</Logo>
                    <BarContainer>
                        <Link to='/home'>
                            <HomeContainer>
                                <button>Home</button>
                            </HomeContainer>
                        </Link>
                        <Link to='/Trips'>
                            <TripsContainer>
                                <button>Trips</button>
                            </TripsContainer>
                        </Link>
                        <Link to='/Blog'>
                            <BlogContainer>
                                <button>BLOG</button>
                            </BlogContainer>
                        </Link>
                        <FavoritesContainer>
                            <button>Favorites</button>
                        </FavoritesContainer>
                        <LoginContainer to='/GoogleLogin'>
                            <button onClick={() => signIn(auth, provider)}>Login</button>
                            <button onClick={() => logOut(auth)}>Logout</button>
                        </LoginContainer>
                    </BarContainer>
                </Nav>
            </OutSide>
        </>
    );
}
