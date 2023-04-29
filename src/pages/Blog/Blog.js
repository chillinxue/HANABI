import React from 'react';
import StorySearchBar from '../../components/SearchBar/StorySearchBar';
import styled from 'styled-components';

export default function Blog() {
    const SearchContainer = styled.div`
        border: 1px solid black;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return (
        <>
            <SearchContainer>
                <StorySearchBar></StorySearchBar>
            </SearchContainer>
        </>
    );
}
