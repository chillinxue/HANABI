import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../../pages/Test';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

const GetPlaceSavedContainer = styled.div`
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
    border-box: box-sizing;
`;
const GetPlaceSavedFilter = styled.div`
    display: flex;
    gap: 1px;
`;
const PlaceTypeButton = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const AllLayerContainer = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const SearchLayerInput = styled.input`
    margin-bottom: 10px;
    height: 20px;
`;
const SavedBox = styled.div`
    width: 100%;
    height: fit-content;
    border: 1px black solid;
    margin-bottom: 10px;
`;
const SavedBoxName = styled.div``;
const SavedBoxAddress = styled.div``;
const DeleteSaveBox = styled.button``;

export default function GetPlaceSaved({ places, setPlaces }) {
    // const [places, setPlaces] = useState(null);
    const [placeType, setPlaceType] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(true);

    useEffect(() => {
        const placeRef = collection(db, 'users', 'Email', 'SavedPlaces');
        let q = placeRef;

        // Filter by place type
        if (placeType) {
            q = query(placeRef, where('type', '==', placeType));
        }

        // Filter by search input
        if (searchInput) {
            q = query(q, where('name', '>=', searchInput), where('name', '<=', searchInput + '\uf8ff'));
        }

        const unsub = onSnapshot(q, (snapshot) => {
            const placeList = [];
            snapshot.docs.forEach((doc) => {
                placeList.push({ id: doc.id, ...doc.data() });
            });
            setPlaces(placeList);
        });

        return () => {
            unsub();
        };
    }, [placeType, searchInput]);

    const handleDelete = async (id) => {
        const placeRef = doc(db, 'users', 'Email', 'SavedPlaces', id);
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
            <GetPlaceSavedContainer style={{ overflow: 'scroll', maxHeight: '410px' }}>
                {showSearchInput && (
                    <SearchLayerInput
                        placeholder='Search places'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                )}
                {places &&
                    places.map((data, index) => (
                        <SavedBox key={index}>
                            <SavedBoxName>{data.name}</SavedBoxName>
                            <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress>
                            <DeleteSaveBox onClick={() => handleDelete(data.id)}>Delete</DeleteSaveBox>
                        </SavedBox>
                    ))}
            </GetPlaceSavedContainer>
            <GetPlaceSavedFilter>
                <AllLayerContainer onClick={() => handleFilter(null)}>ALL</AllLayerContainer>
                <PlaceTypeButton onClick={() => handleFilter('hotel')}>Hotel</PlaceTypeButton>
                <PlaceTypeButton onClick={() => handleFilter('attraction')}>Attraction</PlaceTypeButton>
                <PlaceTypeButton onClick={() => handleFilter('restaurant')}>Restaurant</PlaceTypeButton>
                <PlaceTypeButton onClick={() => handleFilter('transportation')}>Transportation</PlaceTypeButton>
            </GetPlaceSavedFilter>
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
