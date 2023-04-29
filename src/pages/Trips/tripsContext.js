import { createContext, useState } from 'react';

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
