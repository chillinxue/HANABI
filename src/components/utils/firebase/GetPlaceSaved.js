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
    align-items: center;
    justify-content: space-between;
    padding: 0px 16px 0px 43px;
    box-sizing: border-box;
`;
const Inside = styled.div``;
const GetPlaceSavedContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
`;
const Filter = styled.div`
    display: flex;
    gap: 6px;
`;
const PlaceTypeButton = styled.div`
    border: 1px solid #2d2d2d;
    padding: 3px 5px;
    box-sizing: border-box;
    text-align: center;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 17px;
    color: #2d2d2d;
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
const SearchLayerInputContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px 45px 20px 35px;
    box-sizing: border-box;
`;
const SearchLayerInput = styled.input`
    width: 230px;
    height: 25px;
    border: 1px solid #2d2d2d;
    border-radius: 5px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px; /* 左邊距離10px */
    color: #2d2d2d;
    font-size: 10px;
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 25px; /* 與input的高度一樣 */
    opacity: 0.75;
    outline: none;

    ::placeholder {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 700;
        font-size: 10px;
        line-height: 25px; /* 與input的高度一樣 */
        color: #d7d7d7;
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
    width: 210px;
    height: 70px;
    background: #fafafa;
    mix-blend-mode: normal;
    border: 2px solid rgba(250, 250, 250, 0.75);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 0px 10px 5px 10px;
    box-sizing: border-box;
`;
const SavedBoxName = styled.div`
    font-family: 'Noto Sans JP', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    text-align: center;

    color: #2d2d2d;
    margin-top: 10px;
`;
const SavedBoxAddress = styled.div`
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
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
    font-size: 8px;
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
    padding: 4px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    color: #2d2d2d;
    cursor: pointer;
`;
const SubContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 353px);
`;
// export const handleDelete = async (id, userUID) => {
//     const placeRef = doc(db, 'users', userUID, 'SavedPlaces', id);
//     await deleteDoc(placeRef);
// };

export default function GetPlaceSaved({ showOnMap }) {
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
            console.log('snapshot');
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
            setShowSearchInput(true);
        } else {
            setPlaceType(null);
            setShowSearchInput(true);
        }
    };
    return (
        <>
            <SearchLayerInputContainer>
                {showSearchInput && (
                    <SearchLayerInput
                        placeholder='Search Favorites Place'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                )}
            </SearchLayerInputContainer>
            <SubContainer>
                {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}> */}
                <OutSide style={{ overflow: 'scroll' }}>
                    <Inside>
                        <GetPlaceSavedContainer style={{ overflow: 'scroll' }}>
                            <SavedBoxContainer>
                                {places &&
                                    places.map((data, index) => (
                                        <SavedBox key={index}>
                                            <SaveContent>
                                                <SavedBoxHeader>
                                                    <SavedBoxName>📍 {data.name}</SavedBoxName>
                                                    <DeleteSaveBox onClick={() => handleDelete(data.id)}>
                                                        x
                                                    </DeleteSaveBox>
                                                </SavedBoxHeader>
                                                <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress>
                                            </SaveContent>
                                            <AddToTrip onClick={() => setAddPlaces(data)}>+</AddToTrip>
                                        </SavedBox>
                                    ))}
                            </SavedBoxContainer>
                        </GetPlaceSavedContainer>
                    </Inside>
                </OutSide>
                <FilterContainer>
                    <Filter handleFilter={handleFilter}>
                        <PlaceTypeButton
                            onClick={() => {
                                handleFilter(null);
                                showOnMap();
                            }}
                        >
                            ALL
                        </PlaceTypeButton>
                        <PlaceTypeButton
                            onClick={() => {
                                handleFilter('hotel');
                                showOnMap();
                            }}
                        >
                            Hotel
                        </PlaceTypeButton>
                        <PlaceTypeButton
                            onClick={() => {
                                handleFilter('attraction');
                                showOnMap();
                            }}
                        >
                            Attraction
                        </PlaceTypeButton>
                        <PlaceTypeButton
                            onClick={() => {
                                handleFilter('restaurant');
                                showOnMap();
                            }}
                        >
                            Food
                        </PlaceTypeButton>
                        <PlaceTypeButton
                            onClick={() => {
                                handleFilter('transportation');
                                showOnMap();
                            }}
                        >
                            Transportation
                        </PlaceTypeButton>
                    </Filter>
                </FilterContainer>
                {/* </div> */}
            </SubContainer>
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
