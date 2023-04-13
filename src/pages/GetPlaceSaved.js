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
const HotelLayerContainer = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const AttractionLayerContainer = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const RestaurantLayerContainer = styled.div`
    border: 1px black solid;
    padding: 1px;
`;
const TransportationLayerContainer = styled.div`
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

    useEffect(() => {
        const placeRef = collection(db, 'users', 'Email', 'SavedPlaces');
        const unsub = onSnapshot(placeRef, (snapshot) => {
            const placeList = [];
            snapshot.docs.forEach((doc) => {
                placeList.push({ id: doc.id, ...doc.data() });
            });
            setPlaces(placeList);
        });

        return () => {
            unsub();
        };
    }, []);

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
                    <HotelLayerContainer>Hotel</HotelLayerContainer>
                    <AttractionLayerContainer>Attraction</AttractionLayerContainer>
                    <RestaurantLayerContainer>Restaurant</RestaurantLayerContainer>
                    <TransportationLayerContainer>Transportation</TransportationLayerContainer>
                    <SearchLayerContainer>Search</SearchLayerContainer>
                </GetPlaceSavedFilter>
            </GetPlaceSavedContainer>
        </>
    );
}
