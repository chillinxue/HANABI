import React from 'react';
import styled from 'styled-components';

const OutSideContainer = styled.div`
    border:1px black
    width:100%
    padding:0px 32px;
    display: flex;
    justify-content: center;
    flex
    align-items: center;
    `;
const OutSide = styled.div``;
const SearchBar = styled.input``;

export default function AllSearch() {
    return (
        <>
            <OutSideContainer>
                <OutSide>
                    <SearchBar></SearchBar>
                    <button>搜尋地圖</button>
                </OutSide>
            </OutSideContainer>
        </>
    );
}
