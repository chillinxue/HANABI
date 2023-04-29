import styled from 'styled-components';
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { TripsContext } from '../../pages/Trips/tripsContext';

const OutSideContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const OutSide = styled.div``;
const SearchBar = styled.input``;

export default function MenuSearchBar({ onClick }) {
    // const inputRef = useRef(null);
    // const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    const { searchInputRef } = useContext(TripsContext);
    // const [searchInput, setSearchInput] = useState();

    return (
        <>
            <OutSideContainer>
                <OutSide>
                    <SearchBar
                        type='text'
                        ref={searchInputRef} // 使用 ref
                        placeholder='你要找什麼地方'
                        className='search-control'
                    ></SearchBar>
                    {/* <SearchBar onChange={(e) => setSearchInput(e.target.value)}></SearchBar> */}
                    <button onClick={onClick}>搜尋地圖</button>
                </OutSide>
            </OutSideContainer>
        </>
    );
}
