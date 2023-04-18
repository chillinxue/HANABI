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
                            <button onClick={() => signIn(auth, provider)}>Login</button>
                            <button onClick={() => logOut(auth)}>Logout</button>
                        </LoginContainer>
                    </BarContainer>
                </Nav>
            </OutSide>
        </>
    );
}
