import { createContext, useState, useEffect, useContext } from 'react';
import { db } from './Trips';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../Context/AuthContext';

export const TripsContext = createContext({
    places: [],
    addPlaces: {},
    setPlaces: () => {},
    setAddPlaces: () => {},
    trips: [],
    setTrips: () => {},
});

export const TripsContextProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [addPlaces, setAddPlaces] = useState({});
    const [trips, setTrips] = useState([]);

    return (
        <TripsContext.Provider value={{ places, addPlaces, setPlaces, setAddPlaces, trips, setTrips }}>
            {children}
        </TripsContext.Provider>
    );
};
