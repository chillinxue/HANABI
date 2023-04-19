import React from 'react';
import styled from 'styled-components';

const OutSideContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const OutSide = styled.div``;
const SearchBar = styled.input``;
export default function StorySearchBar() {
    return (
        <>
            <OutSideContainer>
                <OutSide>
                    <SearchBar></SearchBar>
                    <button>搜尋文章</button>
                </OutSide>
            </OutSideContainer>
        </>
    );
}
