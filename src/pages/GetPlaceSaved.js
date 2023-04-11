import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './Test';

export default function GetPlaceSaved() {
    const [places, setPlaces] = useState(null);

    useEffect(() => {
        async function getPlaces() {
            const q = query(collection(db, 'users', 'Email', 'SavedPlaces'));
            const placeList = [];

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, ' => ', doc.data());
                placeList.push(doc.data());
            });
            // console.log(placeList);
            setPlaces(placeList);
        }

        getPlaces();
    }, []);

    console.log(places);
    return <div>GetPlaceSaved</div>;
}
