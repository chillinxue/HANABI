import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../../components/utils/firebase/firbase';
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
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <TripsContext.Provider
            value={{ places, addPlaces, setPlaces, setAddPlaces, trips, setTrips, modalOpen, setModalOpen }}
        >
            {children}
        </TripsContext.Provider>
    );
};
