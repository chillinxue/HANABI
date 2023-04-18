import styled from 'styled-components';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const OutSideContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const OutSide = styled.div``;
const SearchBar = styled.input``;

export default function MenuSearchBar() {
    // const inputRef = useRef(null);
    // const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

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
