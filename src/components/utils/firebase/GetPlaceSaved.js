import React, { useEffect, useState, useContext } from 'react';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../../pages/Trips/Trips';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components/macro';
import { AuthContext } from '../../../Context/AuthContext';
import { TripsContext } from '../../../pages/Trips/tripsContext';

const OutSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    gap: 5px;
    height: 95%;
`;
const GetPlaceSavedContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 395px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const Filter = styled.div`
    display: flex;
    gap: 10px;
`;
const PlaceTypeButton = styled.div`
    border: 1px solid #fafafa;
    padding: 3px 5px;
    box-sizing: border-box;
    text-align: center;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    color: #fafafa;
`;
// const AllLayerContainer = styled.div`
//     border: 1px solid #fafafa;
//     padding: 3px;
//     box-sizing: border-box;
//     text-align: center;
//     font-family: 'Noto Sans JP';
//     font-style: normal;
//     font-weight: 700;
//     font-size: 12px;
//     line-height: 17px;
//     text-align: center;

//     color: #fafafa;
// `;
const SearchLayerInput = styled.input`
    margin: 10px 0px;
    width: 325px;
    height: 25px;
    border: 1px solid #fafafa;
    border-radius: 10px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px; /* 左邊距離10px */
    color: #fafafa;
    font-size: 10px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 25px; /* 與input的高度一樣 */
    color: #fafafa;
    opacity: 0.75;

    ::placeholder {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        line-height: 25px; /* 與input的高度一樣 */
        color: #fafafa;
        opacity: 0.75;
        /* padding-left: 10px; 左邊距離10px */
        text-align: start; /* 水平置中 */
    }
`;
const SavedBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
const SavedBox = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;
const SaveContent = styled.div`
    width: 300px;
    background: #f3f3f3;
    mix-blend-mode: normal;
    border: 2px solid rgba(250, 250, 250, 0.75);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 0px 10px 10px 10px;
`;
const SavedBoxName = styled.div`
    font-family: 'Noto Sans JP', sans-serif;
    font-style: normal;
    font-size: 16px;
    line-height: 23px;
    text-align: center;

    color: #2d2d2d;
    margin-top: 10px;
`;
const SavedBoxAddress = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;

    color: #404143;
`;
const SavedBoxHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
`;
const DeleteSaveBox = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    text-align: end;
    margin-right: 10px;

    color: #404143;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const AddToTrip = styled.div`
    width: 40px;
    height: 24px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 14px;
    text-align: center;
    border: 1px solid #fafafa;
    padding: 4px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    color: #fafafa;

    border: 1px solid #fafafa;
`;

export default function GetPlaceSaved() {
    // const [places, setPlaces] = useState(null);
    const [placeType, setPlaceType] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(true);
    const { userUID } = useContext(AuthContext);
    const { places, setPlaces, addPlaces, setAddPlaces } = useContext(TripsContext);

    console.log(userUID);

    useEffect(() => {
        if (!userUID) {
            return;
        }
        const placeRef = collection(db, 'users', userUID, 'SavedPlaces');
        // let q = placeRef;
        // let q;
        // Initialize the base query
        let q = query(placeRef);

        // Filter by place type
        if (placeType) {
            q = query(q, where('type', '==', placeType));
        }

        // Filter by search input
        if (searchInput) {
            q = query(q, where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
        }

        // Listen to query snapshots
        const unsub = onSnapshot(q, (snapshot) => {
            const placeList = [];
            snapshot.docs.forEach((doc) => {
                placeList.push({ id: doc.id, ...doc.data() });
            });
            setPlaces(placeList);
            console.log(placeList);
        });
        console.log(places);
        return () => {
            unsub();
        };
    }, [placeType, searchInput, userUID]);

    const handleDelete = async (id) => {
        const placeRef = doc(db, 'users', userUID, 'SavedPlaces', id);
        await deleteDoc(placeRef);
    };

    const handleFilter = (type) => {
        if (type !== placeType) {
            setPlaceType(type);
            setSearchInput('');
            setShowSearchInput(false);
        } else {
            setPlaceType(null);
            setShowSearchInput(true);
        }
    };
    return (
        <>
            <OutSide>
                {showSearchInput && (
                    <SearchLayerInput
                        placeholder='Search Favorites Place'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                )}
                <GetPlaceSavedContainer style={{ overflow: 'scroll', maxHeight: '395px' }}>
                    <SavedBoxContainer>
                        {places &&
                            places.map((data, index) => (
                                <SavedBox key={index}>
                                    <SaveContent>
                                        <SavedBoxHeader>
                                            <SavedBoxName>{data.name}</SavedBoxName>
                                            <DeleteSaveBox onClick={() => handleDelete(data.id)}>X</DeleteSaveBox>
                                        </SavedBoxHeader>
                                        <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress>
                                    </SaveContent>
                                    <AddToTrip onClick={() => setAddPlaces(data)}>Add</AddToTrip>
                                </SavedBox>
                            ))}
                    </SavedBoxContainer>
                </GetPlaceSavedContainer>
                <FilterContainer>
                    <Filter>
                        <PlaceTypeButton onClick={() => handleFilter(null)}>ALL</PlaceTypeButton>
                        <PlaceTypeButton onClick={() => handleFilter('hotel')}>Hotel</PlaceTypeButton>
                        <PlaceTypeButton onClick={() => handleFilter('attraction')}>Attraction</PlaceTypeButton>
                        <PlaceTypeButton onClick={() => handleFilter('restaurant')}>Restaurant</PlaceTypeButton>
                        <PlaceTypeButton onClick={() => handleFilter('transportation')}>Transportation</PlaceTypeButton>
                    </Filter>
                </FilterContainer>
            </OutSide>
        </>
    );
}

// const myLatLng = [
//     { lat: 35.503593, lng: 138.7634713 },
//     { lat: 35.487404, lng: 138.795665 },
//     { lat: 35.503593, lng: 138.7634713 },
//     { lat: 35.4988753, lng: 138.76763 },
// ];

// const icons = {
//     red: {
//         url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
//         scaledSize: new window.google.maps.Size(50, 50),
//     },
//     blue: {
//         url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
//         scaledSize: new window.google.maps.Size(50, 50),
//     },
//     green: {
//         url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
//         scaledSize: new window.google.maps.Size(50, 50),
//     },
// };
// myLatLng.forEach((location, index) => {
//     const marker = new window.google.maps.Marker({
//         position: location,
//         map,
//         icon: icons[index % 3 === 0 ? 'red' : index % 3 === 1 ? 'blue' : 'green'],
//     });
// });
