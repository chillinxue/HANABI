import React from 'react';
import styled from 'styled-components';
import PlacesRecommend from '../../components/PlacesRecommend/PlacesRecommend';
import MenuSearchBar from '../../components/SearchBar/MenuSearchBar';
import PosterMenu from '../../components/PosterMenu/PosterMenu';

const SearchContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default function Home() {
    return (
        <>
            <PosterMenu></PosterMenu>
            <SearchContainer>
                <MenuSearchBar></MenuSearchBar>
            </SearchContainer>
            <PlacesRecommend></PlacesRecommend>
        </>
    );
}
