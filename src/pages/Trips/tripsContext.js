import { createContext, useState } from 'react';

export const TripsContext = createContext({
    places: [],
    addPlaces: {},
    setPlaces: () => {},
    setAddPlaces: () => {},
});

export const TripsContextProvider = ({ children }) => {
    const [places, setPlaces] = useState([]);
    const [addPlaces, setAddPlaces] = useState({});
    return (
        <TripsContext.Provider value={{ places, addPlaces, setPlaces, setAddPlaces }}>{children}</TripsContext.Provider>
    );
};
