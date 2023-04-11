
import React from 'react';
import styled from 'styled-components';

const OutSide = styled.div`
    width: 100%;
    height: 50px;
    border: 1px black;
`;
const Nav = styled.div`
    width: 100%;
    height: 60px;
    border: 1px black;
    display: flex;
    justify-content: space-between;
`;
const MenuContainer = styled.div`
    display: flex;
`;
const Logo = styled.div`
    width: 50px;
    height: 30px;
    border: 1px black;
`;
const TripsContainer = styled.div``;
const BlogContainer = styled.div``;
const FavoritesContainer = styled.div``;
const LoginContainer = styled.div``;
export default function Header() {
    return (
        <>
            <OutSide>
                <Nav>
                    <Logo>HANABi🎇</Logo>
                    <MenuContainer>
                        <TripsContainer>
                            <button>Trips</button>
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
                    </MenuContainer>
                </Nav>
            </OutSide>
        </>
    );
}
