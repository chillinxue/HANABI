import styled from 'styled-components';
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import MenuSearchBar from '../../components/SearchBar/MenuSearchBar';
import PosterMenu from '../../components/PosterMenu/PosterMenu';
import { initializeApp } from 'firebase/app';
import { arrayUnion, getFirestore, onSnapshot } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import GetPlaceSaved from '../../components/utils/firebase/GetPlaceSaved';
import Modal from 'react-modal';
import AddTripPopUpModal from '../../components/PopUpModal/AddTripPopUpModal';
import { AuthContext } from '../../Context/AuthContext';
import { TripsContextProvider } from './tripsContext';
import { TripsContext } from './tripsContext';

const firebaseConfig = {
    apiKey: 'AIzaSyBx7Q_DL9eZ9zy9U-naVJ4iQPFdpfLL5Qc',
    authDomain: 'hanabi-f5ee3.firebaseapp.com',
    projectId: 'hanabi-f5ee3',
    storageBucket: 'hanabi-f5ee3.appspot.com',
    messagingSenderId: '602379997527',
    appId: '1:602379997527:web:108c1f46f5e8788fe6ae12',
    measurementId: 'G-Q9NRVJV8NH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const Outside = styled.div``;
const SearchContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;
const RouteMapContainer = styled.div`
    border: 1px solid black;
    height: 500px;
    display: flex;
    margin-top: 20px;
`;
const RouteContainer = styled.div`
    border: 1px solid black;
    width: 200px;
    height: 500px;
`;
const FavoritesContainer = styled.div`
    border: 1px black solid;
    width: 500px;
    padding: 10px;
    border-box: box-sizing;
`;
const MapOutContainer = styled.div``;

const PlanOutContainer = styled.div`
    border: 1px solid black;
    display: flex;
    width: 100%;
    height: 500px;
    padding: 20px;
    border-box: box-sizing;
    gap: 20px;
    margin-top: 20px;
`;
const PlanLeftContainer = styled.div`
    border: 1px solid black;
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const PlanRightContainer = styled.div`
    width: 100%;
`;
const TripsBox = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 50px;
    background-color: ${(props) => (props.isSelected ? 'grey' : 'white')};
`;

const TripInfoContainer = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 100%;
    border-box: box-sizing;
`;

const TripDateContainer = styled.div`
    display: flex;
    gap: 10px;
`;
const DateBox = styled.div`
    width: fit-content;
    height: 20px;
    border: 1px solid black;
    background-color: ${(props) => (props.isSelected ? 'grey' : 'white')};
`;
const AddTripDetailContainer = styled.div`
    border: 1px solid black;
    height: 50px;
    display: flex;
    margin: 5px;
`;
const AddTripDetailPlace = styled.div`
    border: 1px solid black;
    margin: 5px;
`;
const AddTripDetailTime = styled.div`
    border: 1px solid black;
    margin: 5px;
`;
const AddTripDetailAddress = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;
const AddDescription = styled.input`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;

const SavedTripDetailContainer = styled.div`
    border: 1px solid black;
    height: 50px;
    display: flex;
    margin: 5px;
`;
const SavedTripDetailPlace = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 100%;
`;
const SavedTripDetailTime = styled.div`
    border: 1px solid black;
    margin: 5px;
`;
const SavedTripDetailAddress = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;
const SavedDescription = styled.div`
    border: 1px solid black;
    width: 100%;
    margin: 5px;
`;
export default function Trips() {
    const { userUID } = useContext(AuthContext);
    let cachedScripts = [];
    function useScript(src) {
        // Keeping track of script loaded and error state   //load SDK 初始資料 （收）

        const [state, setState] = useState({
            loaded: false,
            error: false,
        });

        useEffect(() => {
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,

                    error: false,
                });
            } else {
                cachedScripts.push(src);
                let script = document.createElement('script');
                script.src = src;
                script.async = true;
                const onScriptLoad = () => {
                    setState({
                        loaded: true,
                        error: false,
                    });
                };

                const onScriptError = () => {
                    const index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();
                    setState({
                        loaded: true,
                        error: true,
                    });
                };
                script.addEventListener('load', onScriptLoad);
                script.addEventListener('error', onScriptError);
                document.body.appendChild(script);
                return () => {
                    script.removeEventListener('load', onScriptLoad);
                    script.removeEventListener('error', onScriptError);
                };
            }
        }, [src]);
        return [state.loaded, state.error];
    }
    const [loaded, error] = useScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
    ); //憑證
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to
    const fromInputRef = useRef(null); // 新增起點 ref
    const toInputRef = useRef(null); // 新增終點 ref
    const [to, setTo] = useState(''); // 新增終點 state
    const [locationInfo, setLocationInfo] = useState(null);
    // const [places, setPlaces] = useState();
    const { places, setPlaces, addPlaces, setAddPlaces } = useContext(TripsContext);
    // const inputRef = useRef(null);

    const [favorites, setFavorites] = useState([]);
    const [typeSaved, setTypeSaved] = useState(null);
    const inputRef = useRef(null);
    const [address, setAddress] = useState('');
    const [latLngResults, setLatLngResults] = useState([]);
    const cachedPlaces = useMemo(() => places, [places]);
    const [markers, setMarkers] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        if (!userUID) {
            // 如果用戶未登入，則顯示警告框
            alert('請先登入');
            return;
        }
        setModalOpen(true);
    };
    console.log(addPlaces);
    const closeModal = () => {
        setModalOpen(false);
    };

    const [trips, setTrips] = useState([]); //抓到旅行資料
    const initialSelectedDates = trips && trips.length > 0 ? trips[0].dateRange : [];
    // const [selectedTrip, setSelectedTrip] = useState(initialSelectedDates);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [selectedTripDate, setSelectedTripDate] = useState(undefined); // 預設為 undefined
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [sortedData, setSortedData] = useState();
    const [enterDescription, setEnterDescription] = useState('');
    const [tripUpdated, setTripUpdated] = useState(false);
    const [autoUpdateTrips, setAutoUpdateTrips] = useState({});
    const [isClickTrip, setIsClickTrip] = useState(false);
    const [isClickDate, setIsClickDate] = useState(false);

    const handleDateClick = (date) => {
        setSelectedTripDate(date);
    };

    console.log(selectedTrip.dates);
    // const handleTripClick = (trip, index) => {
    //     const tripDates = trips[index].dates;
    //     setSelectedDates(tripDates);
    // };
    useEffect(() => {
        if (!userUID) {
            return;
        }
        const tripsRef = collection(db, `users/${userUID}/trips`);
        const unsubscribe = onSnapshot(tripsRef, (snapshot) => {
            const newTrips = snapshot.docs.map((doc) => doc.data());
            setTrips(newTrips);

            // Get the selected trip from the updated trips array
            const updatedSelectedTrip = newTrips.find((trip) => trip.tripId === selectedTrip.tripId);

            // If the selected trip's data has changed, update the autoUpdateTrips state
            if (updatedSelectedTrip && JSON.stringify(updatedSelectedTrip) !== JSON.stringify(selectedTrip)) {
                setSelectedTrip(updatedSelectedTrip);
                setAutoUpdateTrips(updatedSelectedTrip.dates[selectedDateIndex]);
            }
        });

        // const tripsRef = collection(db, `users/${userUID}/trips`);
        // const unsubscribe = onSnapshot(tripsRef, (snapshot) => {
        //     const newTrips = snapshot.docs.map((doc) => doc.data());
        //     setTrips(newTrips);
        //     console.log(newTrips); // 在此處添加console.log
        // });
        // if (!selectedDateIndex) {
        //     return;
        // }
        // const addTripDetailTestRef = doc(db, 'users', userUID, 'trips', selectedTrip.tripId);

        // const addTripDoc = onSnapshot(addTripDetailTestRef, (docSnapshot) => {
        //     console.log('Received doc snapshot: ', docSnapshot.data());
        //     setAutoUpdateTrips(docSnapshot.data());
        // });
        // setTripUpdated(false);

        return () => {
            unsubscribe();
            // addTripDoc();
        };
    }, [userUID, tripUpdated]);

    const [time, setTime] = useState(''); //時間選擇器
    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setEnterDescription(event.target.value);
    };

    async function uploadItems(name, id, address, rating, url, website, type) {
        //存入user sub-collection Places
        try {
            const itemsRef = doc(db, 'users', userUID);
            console.log(itemsRef);
            console.log(name, id, address, rating, url, website, type);
            await addDoc(collection(itemsRef, 'SavedPlaces'), {
                name: name,
                placeId: id,
                formatted_address: address,
                rating: rating,
                url: url,
                website: website,
                type: type,
            });
            // console.log('Item uploaded with ID: ', docRef.id);
        } catch (e) {
            console.error('Error uploading item: ', e);
        }
    }
    async function fetchData() {
        const apiKey = 'AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4';
        const addresses = cachedPlaces.map((place) => place.formatted_address);
        const promises = addresses.map(async (address) => {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
            );
            const data = await response.json();
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        });
        const results = await Promise.all(promises);
        console.log(results);

        const filteredResults = results.filter(({ lat, lng }, index) => {
            const address = addresses[index];
            const place = places.find((place) => place.formatted_address === address);
            return !!place;
        });

        console.log(filteredResults);

        const allmarkers = filteredResults.map(({ lat, lng }, index) => {
            const place = places.find(({ formatted_address }) => formatted_address === addresses[index]);
            const title = `${place.name} (${place.formatted_address})`;
            const marker = new window.google.maps.Marker({
                position: { lat, lng },
                title,
            });

            const infowindow = new window.google.maps.InfoWindow({
                content: `<div><strong>${place.name}</strong><br>${place.formatted_address}<br>Phone: ${place.formatted_phone_number}<br>Rating: ${place.rating}<br>Website: ${place.website}</div>`,
            });
            console.log(place);
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });

            marker.setMap(map);
            return marker;
        });

        setMarkers(allmarkers);
    }
    function addToFavorites() {
        if (to) {
            // setFavorites((prevFavorites) => [...prevFavorites, to]);
            console.log(locationInfo);
            const favoriteList = [...favorites, locationInfo];
            setFavorites(favoriteList);
            // console.log(favoriteList[favoriteList.length - 1].place_id);
            uploadItems(
                locationInfo.name,
                locationInfo.place_id,
                locationInfo.formatted_address,
                locationInfo.rating,
                locationInfo.url,
                locationInfo.website,
                typeSaved
            );
            console.log(locationInfo.place_id);
        }
    }

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [{ lat: 35.682518, lng: 139.765804 }];
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 10, //zoom in
                center: myLatLng[0], //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
            });

            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current);
            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                setFrom(fromAutocomplete.getPlace().formatted_address);
            });

            toAutocomplete.addListener('place_changed', () => {
                setTo(toAutocomplete.getPlace().formatted_address);
                toInputRef.current.value = toAutocomplete.getPlace().formatted_address;
                setLocationInfo(toAutocomplete.getPlace());
            });
            setDataMap(map);
            console.log(latLngResults);
        }
    }, [loaded]);
    useEffect(() => {
        getNewSortedDate(); //.map之前consloe出來是個array，讓他
    }, [selectedTrip]); //當點擊trip，產生時間順續的array

    console.log(places);
    //create a DirectionsService object to use the route method and get a result for our request
    const directionsService = new window.google.maps.DirectionsService(); //路線計算

    //create a DirectionsRenderer object which we will use to display the route
    const directionsDisplay = new window.google.maps.DirectionsRenderer(); //路線render

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map); //綁定到map

    function calcRoute() {
        //create request
        const request = {
            origin: from, //
            destination: to, //存一個state 控制
            travelMode: window.google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT 路線模式
            unitSystem: window.google.maps.UnitSystem.METRIC, //單位
        };

        directionsService.route(request, function (result, status) {
            // console.log(status);
            if (status == window.google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result); //寫路線的功能
                // console.log(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map in London
                map.setCenter({ lat: 25.033964, lng: 121.564468 });
                //show error message
            }
        });
    }

    console.log(selectedTrip.dates);

    // if (locationInfo !== null) {
    //     console.log('locationInfo:', locationInfo.geometry);
    // } else {
    // }

    // console.log(selectedTrip.dates);

    function getSortedDate() {
        if (Object.keys(selectedTrip).length > 0) {
            const timeList = selectedTrip.dates.map((date) => date);
            const sortedData = Object.fromEntries(
                Object.entries(timeList)
                    .filter(([key]) => !isNaN(Date.parse(key))) // filter out non-time keys
                    .sort(([a], [b]) => new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`))
            );
            return sortedData;
        }
    } //selectedtrip.date（有包含地址資料）按照時間順序排

    function getNewSortedDate() {
        if (getSortedDate()) {
            const dates = Object.keys(getSortedDate()[selectedDateIndex]).filter((time) => time !== 'date'); // { 9:00: {}, 10:00: {}, date: '' }
            dates.sort((a, b) => {
                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
            });
            return dates;
        }
    } //單純把時間拿出來排

    console.log(selectedTrip.dates);
    async function addTripDetailToFirebase() {
        const addTripDetailTestRef = doc(db, 'users', userUID, 'trips', selectedTrip.tripId);
        const selectedDate = selectedTrip.dates[selectedDateIndex];

        await updateDoc(addTripDetailTestRef, {
            dates: selectedTrip.dates.map((date) => {
                if (date.date === selectedDate.date) {
                    return {
                        ...date,
                        [time]: {
                            // date: selectedTripDate,
                            placeName: addPlaces.name,
                            placeAddress: addPlaces.formatted_address,
                            placeId: addPlaces.placeId,
                            placesWebsite: addPlaces.website,
                            description: enterDescription,
                        },
                    };
                }
                return date;
            }),
        });
        setTripUpdated(true);
    }
    // async function addTripDetailToFirebase() {
    //     console.log(userUID);
    //     const addTripDetailTestRef = doc(db, 'users', userUID, 'trips', selectedTrip.tripId);

    //     for (let i = 0; i < selectedTrip.dates.length; i++) {
    //         if (i === selectedDateIndex) {
    //             await updateDoc(addTripDetailTestRef, {
    //                 dates: {
    //                     date: selectedTrip.dates[selectedDateIndex],
    //                     [time]: {
    //                         date: selectedTripDate,
    //                         placeName: addPlaces.name,
    //                         placeAddress: addPlaces.formatted_address,
    //                         placeId: addPlaces.placeId,
    //                         placesWebsite: addPlaces.website,
    //                         description: enterDescription,
    //                     },
    //                 },
    //             });
    //             break;
    //         }
    //     }
    //     // await updateDoc(addTripDetailTestRef, {
    //     //     dates: arrayUnion({
    //     //         ...selectedTrip.dates[selectedDateIndex],

    //     //         [time]: {
    //     //             date: selectedTripDate,
    //     //             placeName: addPlaces.name,
    //     //             placeAddress: addPlaces.formatted_address,
    //     //             placeId: addPlaces.placeId,
    //     //             placesWebsite: addPlaces.website,
    //     //             description: enterDescription,
    //     //         },
    //     //     }),
    //     // });
    // }

    console.log(selectedTripDate);
    console.log(addPlaces.formatted_address);
    console.log(addPlaces.placeId);
    console.log(addPlaces.website);
    console.log(selectedDateIndex);
    console.log('userUID: ', userUID);
    console.log(autoUpdateTrips);

    if (!loaded) {
        return;
    }
    return (
        <>
            <Outside>
                <PosterMenu></PosterMenu>
                <SearchContainer>
                    <MenuSearchBar></MenuSearchBar>
                </SearchContainer>
                <RouteMapContainer>
                    <RouteContainer>
                        <input
                            type='text'
                            ref={fromInputRef} // 使用 ref
                            placeholder='你在哪裏?'
                            className='form-control'
                        />
                        <input
                            type='text'
                            ref={toInputRef} // 使用 ref
                            placeholder='你要去哪裡?'
                            className='form-control'
                        />
                        <button onClick={() => calcRoute()}>搜尋路線</button>
                    </RouteContainer>
                    <FavoritesContainer>
                        <select name='layerSaved' id='placeSaved' onChange={(e) => setTypeSaved(e.target.value)}>
                            <option value=''>--選擇存取資料夾--</option>
                            <option value='hotel'>飯店</option>
                            <option value='attraction'>景點</option>
                            <option value='restaurant'>餐廳</option>
                            <option value='transportation'>交通</option>
                        </select>
                        <button onClick={() => addToFavorites()}>加入最愛</button> {/* 新增加入最愛按鈕 */}
                        <input
                            type='checkbox'
                            onChange={(e) => {
                                if (e.target.checked) {
                                    fetchData();
                                } else {
                                    markers.forEach((marker) => marker.setMap(null));
                                }
                            }}
                        />
                        <label>顯示於地圖上</label>
                        <GetPlaceSaved
                            places={places}
                            setPlaces={setPlaces}
                            setShowMarkers={setShowMarkers}
                        ></GetPlaceSaved>
                    </FavoritesContainer>
                    <MapOutContainer
                        id='map'
                        style={{ height: '100%', width: '100%', border: `1px solid #88C8EC` }}
                    ></MapOutContainer>
                </RouteMapContainer>
                <PlanOutContainer>
                    <PlanLeftContainer>
                        <button onClick={openModal}>Add new Trip</button>
                        {trips &&
                            trips.map((trip, index) => (
                                <TripsBox
                                    key={index}
                                    onClick={() => {
                                        console.log(trip);
                                        setSelectedTrip(trip);
                                        console.log(trips);
                                    }}
                                >
                                    {trip.tripname}
                                </TripsBox>
                            ))}
                    </PlanLeftContainer>
                    <PlanRightContainer>
                        <TripInfoContainer>
                            <AddTripDetailContainer>
                                <AddTripDetailTime>
                                    <input type='time' value={time} onChange={handleTimeChange} />
                                </AddTripDetailTime>
                                <AddTripDetailPlace>{addPlaces.name}</AddTripDetailPlace>
                                <AddTripDetailAddress>{addPlaces.formatted_address}</AddTripDetailAddress>
                                <AddDescription
                                    value={enterDescription}
                                    onChange={handleDescriptionChange}
                                ></AddDescription>
                                <button onClick={addTripDetailToFirebase}>Add</button>
                            </AddTripDetailContainer>
                            {/* {selectedTrip.dates[0]} */}
                            <TripDateContainer>
                                {selectedTrip.dates?.map((date, index) => (
                                    <DateBox
                                        key={index}
                                        onClick={() => {
                                            setSelectedDateIndex(index);
                                            setSelectedTripDate(
                                                `${date.date.split('/')[0]}/${date.date.split('/')[1]}/${
                                                    date.date.split('/')[2]
                                                }`
                                            );
                                        }}
                                    >
                                        {date.date.split('/')[1]}/{date.date.split('/')[2]}
                                    </DateBox>
                                ))}
                            </TripDateContainer>
                            {getNewSortedDate() &&
                                getNewSortedDate().map((time) => (
                                    <>
                                        <SavedTripDetailContainer>
                                            <SavedTripDetailTime>{time}</SavedTripDetailTime>
                                            <SavedTripDetailPlace>
                                                {selectedTrip.dates[selectedDateIndex][time].placeName}
                                            </SavedTripDetailPlace>
                                            <SavedTripDetailAddress>
                                                {selectedTrip.dates[selectedDateIndex][time].placeAddress}
                                            </SavedTripDetailAddress>
                                            <SavedDescription>
                                                {selectedTrip.dates[selectedDateIndex][time].description}
                                            </SavedDescription>
                                        </SavedTripDetailContainer>
                                    </>
                                ))}
                        </TripInfoContainer>
                    </PlanRightContainer>
                </PlanOutContainer>
            </Outside>
            {modalOpen ? (
                // <div>
                //     <ModalOverlay onClick={closeModal} />
                //     <ModalContainer onClick={(e) => e.stopPropagation()}></ModalContainer>
                // </div>
                <AddTripPopUpModal modalOpen={modalOpen} setModalOpen={setModalOpen}></AddTripPopUpModal>
            ) : null}
        </>
    );
}
