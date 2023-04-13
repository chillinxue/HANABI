import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './Test';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
const SavedBox = styled.div`
    width: 100%;
    height: fit-content;
    border: 1px black solid;
`;
const SavedBoxName = styled.div``;
const SavedBoxAddress = styled.div``;
export default function GetPlaceSaved() {
    const [places, setPlaces] = useState(null);
    // const apiKey = 'YOUR_API_KEY';
    // const placeId = 'YOUR_PLACE_ID';

    // fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address&key=${apiKey}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     const { name, formatted_address } = data.result;
    //     console.log(`名稱：${name}`);
    //     console.log(`地址：${formatted_address}`);
    //   })
    //   .catch(error => console.log(error));

    useEffect(() => {
        async function getPlaces() {
            const q = query(collection(db, 'users', 'Email', 'SavedPlaces'));
            const placeList = [];

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
                placeList.push(doc.data());
            });

            const placeRef = collection(db, 'users', 'Email', 'SavedPlaces');

            const unsub = onSnapshot(placeRef, (snapshot) => {
                const placeList = [];
                snapshot.docs.forEach((doc) => {
                    placeList.push(doc.data());
                });
                // console.log(placeList);
                setPlaces(placeList);
                console.log(snapshot);
                console.log('Current data: ', placeList);
            });
            return () => {
                unsub();
            };

            // const unsub = onSnapshot(placeRef), (doc) => {
            // });
        }
        getPlaces();
    }, []);

    console.log('places in placedsave', places);
    return (
        <>
            <div>
                {places &&
                    places.map((data, index) => (
                        <SavedBox to={``}>
                            <SavedBoxName src=''>{data.name}</SavedBoxName>
                            <SavedBoxAddress>{data.formatted_address}</SavedBoxAddress>
                        </SavedBox>
                    ))}
            </div>
        </>
    );
}
