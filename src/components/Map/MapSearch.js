import React from 'react';
import styled from 'styled-components';

const OutSide = styled.div`
    border:1px black
    width:100%
    padding:0px 32px;
    align-items:center;
    display:flex;
    justify-content:center;
    `;
const SearchBar = styled.input``;

export default function MapSearch() {
    return (
        <>
            <OutSide>
                <SearchBar></SearchBar>
                <button>搜尋地圖</button>
            </OutSide>
        </>
    );
}
