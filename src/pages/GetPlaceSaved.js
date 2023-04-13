import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './Test';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

const GetPlaceSavedContainer = styled.div`
    padding: 10px 10px;
    display: flex;
    flex-direction: column;
`;
const GetPlaceSavedFilter = styled.div`
    display: flex;
    gap: 1px;
`;
const PlaceTypeButton = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const SearchLayerContainer = styled.div`
    border: 1px black solid;
    padding: 1px;
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

export default function GetPlaceSaved() {
    const [places, setPlaces] = useState(null);
    const [placeType, setPlaceType] = useState(null);

    useEffect(() => {
        const placeRef = collection(db, 'users', 'Email', 'SavedPlaces');
        const typeFilter = placeType ? where('type', '==', placeType) : null;
        const q = query(placeRef, typeFilter);

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
    }, [placeType]);

    const handleDelete = async (id) => {
        const placeRef = doc(db, 'users', 'Email', 'SavedPlaces', id);
        await deleteDoc(placeRef);
    };

    return (
        <>
            <GetPlaceSavedContainer>
                {places &&
                    places.map((data, index) => (
                        <SavedBox key={index}>
                            <SavedBoxName>{data.name}</SavedBoxName>
                            <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress>
                            <DeleteSaveBox onClick={() => handleDelete(data.id)}>Delete</DeleteSaveBox>
                        </SavedBox>
                    ))}
                <GetPlaceSavedFilter>
                    <PlaceTypeButton onClick={() => setPlaceType('hotel')}>Hotel</PlaceTypeButton>
                    <PlaceTypeButton onClick={() => setPlaceType('attraction')}>Attraction</PlaceTypeButton>
                    <PlaceTypeButton onClick={() => setPlaceType('restaurant')}>Restaurant</PlaceTypeButton>
                    <PlaceTypeButton onClick={() => setPlaceType('transportation')}>Transportation</PlaceTypeButton>
                    <SearchLayerContainer onClick={() => setPlaceType()}>Search</SearchLayerContainer>
                </GetPlaceSavedFilter>
            </GetPlaceSavedContainer>
        </>
    );
}
