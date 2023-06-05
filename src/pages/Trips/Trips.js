import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import AddTripPopUpModal from '../../components/PopUpModal/AddTripPopUpModal';
import { db } from '../../components/utils/firebase/firbase';
import Joyride, { STATUS } from 'react-joyride';

import Header from '../../components/Header/Header';
import GetPlaceSaved from '../../components/utils/firebase/GetPlaceSaved';
import './Trips.css';
import TripsSchedule from './TripsSchedule';

import { addDoc, collection, doc } from 'firebase/firestore';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthContext';
import { TripsContext } from './tripsContext';

import SearchIcon from './search.png';

const OutSide = styled.div`
    width: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* border: 1px solid white; */
`;
const MainPageContainer = styled.div`
    width: 100%;
    /* height: 100vh; */
    height: 100vh;
    padding-top: 47px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
`;
const LeftBarContainer = styled.div`
    width: 340px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* border: 1px solid black; */
    background-color: #dadada;
`;
const LeftBar = styled.div`
    width: 100%;
    /* height: 100%; */
    /* border: 1px solid black; */
    box-sizing: border-box;
`;
const LeftBarHeader = styled.div`
    height: 220px;
    /* border: 1px solid black; */
    padding: 31px 39px 33px 38px;
    box-sizing: border-box;
`;
const LeftBarHeaderTitle = styled.div`
    /* border: 1px solid black; */
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: left;
    margin-bottom: 17px;

    color: #2d2d2d;
`;
const RouteContainer = styled.div`
    width: 210px;
    height: 40px;
    border: 1px solid black;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px 0px 15px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;
const RouteInput = styled.input`
    width: 210 px;
    border: none;
    box-shadow: none;
    outline: none;
    background: none;
    display: flex;
    justify-content: center;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;

    color: #2d2d2d;

    ::placeholder {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;

        color: #7d7d7d;
    }
`;
const SearchIconContainer = styled.img`
    width: 15px;
    position: relative;
    right: 20px;
`;
const SelectedTypeContainer = styled.div`
    display: flex;
`;
const SelectedType = styled.select`
    width: 115px;
    height: 25px;
    background-color: transparent;
    /* padding: 7px; */
    border-radius: 5px;
    opacity: 0.5;
    border: 1px solid #2d2d2d;
    box-sizing: border-box;

    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;

    color: #2d2d2d;

    opacity: 0.75;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;

const Option = styled.option`
    background-color: rgba(255, 255, 255, 0.5);
    font-family: 'Noto Sans JP';
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 14px;
    color: #2d2d2d;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const MapOutContainer = styled.div``;

const RightBarContainer = styled.div`
    width: 405px;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: start;
    /* align-items: flex-end; */
    /* border: 1px solid black; */
    background-color: #dadada;
    transform: translateX(${(props) => (props.isOpen ? '0' : '100%')});
    transition: transform 0.3s ease;
`;
const AddtoFavContainer = styled.div`
    display: flex;
    gap: 5px;
`;
const AddtoFav = styled.div`
    background-color: transparent;
    border-radius: 5px;
    opacity: 0.75;
    border: 1px solid #2d2d2d;
    display: flex;
    align-items: center;
    justify-content: start;
    box-sizing: border-box;
    padding: 1px;

    font-style: normal;
    font-weight: 700;
    font-size: 0.5em;
    line-height: 14px;
    color: #2d2d2d;

    opacity: 0.75;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:hover {
        background-color: #2c3e50;
        color: #fafafa;
    }

    &:active {
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.1);
    }
`;
const FavoritesContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 267px);
`;
const FavoritesHeader = styled.div`
    padding-left: 39px;
    box-sizing: border-box;
`;
const FavLogo = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #2d2d2d;
`;

export default function Trips() {
    const { userUID } = useContext(AuthContext);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { signIn, logOut } = useContext(AuthContext);
    const { modalOpen, setModalOpen } = useContext(TripsContext);

    let cachedScripts = [];
    const mapOptions = {
        disableDefaultUI: true, // 移除地圖的預設控制介面
        streetViewControl: false, // 移除街景控制功能
    };
    console.log(process.env.REACT_APP_GOOGlE_MAPS_API_KEY);
    const [loaded, error] = useScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGlE_MAPS_API_KEY}&libraries=places&callback=initMap`
    );
    //憑證
    function useScript(src) {
        // Keeping track of script loaded and error state   //load SDK 初始資料 （收）
        useEffect(() => {
            window.scrollTo(0, 0); // 在页面加载完成或页面切换时滚动到顶部
        }, []);

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
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to
    const fromInputRef = useRef(null); // 新增起點 ref
    const toInputRef = useRef(null); // 新增終點 ref
    const [to, setTo] = useState(''); // 新增終點 state
    const [locationInfo, setLocationInfo] = useState(null);
    // const [places, setPlaces] = useState();
    const { places, setPlaces, addPlaces, setAddPlaces, trips, setTrips } = useContext(TripsContext);

    const [favorites, setFavorites] = useState([]);
    const [typeSaved, setTypeSaved] = useState(null);
    const [address, setAddress] = useState('');
    const [latLngResults, setLatLngResults] = useState([]);
    const cachedPlaces = useMemo(() => places, [places]);
    const [markers, setMarkers] = useState([]);
    const [showMarkers, setShowMarkers] = useState(false);
    // const searchInputRef = useRef(null);
    const { searchInputRef } = useContext(TripsContext);
    const [isRightBarOpen, setIsRightBarOpen] = useState(true);

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [{ lat: 35.682518, lng: 139.765804 }];
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 10, //zoom in
                center: myLatLng[0], //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
            });

            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current);
            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current);
            // const searchAutocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                setFrom(fromAutocomplete.getPlace().formatted_address);
            });

            toAutocomplete.addListener('place_changed', () => {
                setTo(toAutocomplete.getPlace().formatted_address);
                toInputRef.current.value = toAutocomplete.getPlace().formatted_address;
                setLocationInfo(toAutocomplete.getPlace());
            });

            // searchAutocomplete.addListener('place_changed', () => {
            //     searchInputRef.current.value = searchAutocomplete.getPlace().formatted_address;
            //     setLocationInfo(searchAutocomplete.getPlace());
            // });
            setDataMap(map);
            console.log(latLngResults);
        }
    }, [loaded]);

    //create a DirectionsService object to use the route method and get a result for our request
    const directionsService = new window.google.maps.DirectionsService(); //路線計算

    //create a DirectionsRenderer object which we will use to display the route
    const directionsDisplay = new window.google.maps.DirectionsRenderer(); //路線render

    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map); //綁定到map

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            directionsDisplay.setMap(null);
            calcRoute();
        }
    };
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
            console.log(result);
        });
    }

    async function fetchData(placeType) {
        const apiKey = 'AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4';
        const filteredPlaces = placeType ? places.filter((place) => place.type === placeType) : places;
        const addresses = filteredPlaces.map((place) => place.formatted_address);
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

        const allMarkers = filteredResults.map(({ lat, lng }, index) => {
            const place = places.find(({ formatted_address }) => formatted_address === addresses[index]);
            const title = `${place.name} (${place.formatted_address})`;
            const marker = new window.google.maps.Marker({
                position: { lat, lng },
                title,
            });

            const infowindow = new window.google.maps.InfoWindow({
                content: `
                    <article class='article-wrapper'>
                        <div class='rounded-lg container-project'  
                        style={{
                        
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                        <img class="place-photo" src="${place.photo}">
                        </div>
                        <div class='project-info'>
                            <div class='flex-pr'>
                                <div class='project-title text-nowrap'>${place.name}</div>
                                <div class='project-hover'>
                                <a href=${place.website}>
                                <svg
                                style={{ color: 'black' }}
                                xmlns='http://www.w3.org/2000/svg'
                                width='2em'
                                height='2em'
                                color='black'
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                viewBox='0 0 24 24'
                                strokeWidth='2'
                                fill='none'
                                stroke='currentColor'
                                style={{ cursor: 'pointer' }}
                                >
                                <line y2='12' x2='19' y1='12' x1='5'></line>
                                <polyline points='12 5 19 12 12 19'></polyline>
                            </svg>
                        </a>
                                </div>
                            </div>
                            <div style={{ color: 'black', fontSize: '8px', margin: '8px 0px' }}>
                                Address: ${place.formatted_address}
                                <br />
                                Phone: ${place.formatted_phone_number}
                            </div>
                            <div class='types'>
                                <span class='project-type'>• ${place.type}</span>
                            </div>
                        </div>
                    </article>`,
            });
            console.log(place);
            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });

            marker.setMap(map);
            return marker;
        });

        setMarkers(allMarkers);
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
                locationInfo.formatted_phone_number || '',
                locationInfo.rating || '',
                locationInfo.url || '',
                locationInfo.website || '',
                typeSaved
            );
            console.log(locationInfo.place_id);
        }
    }

    async function uploadItems(name, id, address, phone, rating, url, website, type) {
        //存入user sub-collection Places
        try {
            const itemsRef = doc(db, 'users', userUID);
            console.log(itemsRef);
            console.log(name, id, address, rating, url, website, type);
            await addDoc(collection(itemsRef, 'SavedPlaces'), {
                name: name,
                placeId: id,
                formatted_address: address,
                formatted_phone_number: phone || '',
                rating: rating || '',
                url: url || '',
                website: website || '',
                //如果要加回去，要在上面（）填回去，下方也要加（這個導致很多地方沒辦法加入fav
                type: type,
            });
            // console.log('Item uploaded with ID: ', docRef.id);
        } catch (e) {
            console.error('Error uploading item: ', e);
        }
    }

    function showOnMap(placeType) {
        setShowMarkers(!showMarkers);
        if (!showMarkers) {
            fetchData(placeType);
        } else {
            markers.forEach((marker) => marker.setMap(null));
        }
    }

    const openModal = () => {
        if (!userUID) {
            alert('請先登入');
            return;
        }
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const [{ run, steps }, setState] = useState({
        run: true,
        steps: [
            {
                content: <h2>Let's begin to plan a trip</h2>,
                locale: { skip: <strong>SKIP</strong> },
                placement: 'center',
                target: 'body',
            },
        ],
    });
    return (
        <>
            <OutSide>
                <Header></Header>
                <Joyride callback={() => {}} run={run} steps={steps} hideCloseButton></Joyride>
                <MainPageContainer>
                    <LeftBarContainer>
                        <LeftBar>
                            <LeftBarHeader>
                                <LeftBarHeaderTitle>PLACE SEARCH | ROUTE SEARCH</LeftBarHeaderTitle>
                                <RouteContainer>
                                    <RouteInput
                                        type='text'
                                        ref={fromInputRef} // 使用 ref
                                        placeholder='START 出発点'
                                    ></RouteInput>
                                </RouteContainer>
                                <RouteContainer>
                                    <RouteInput
                                        type='text'
                                        ref={toInputRef} // 使用 ref
                                        placeholder='DESTINATION 终点'
                                        onKeyDown={handleKeyDown}
                                    ></RouteInput>
                                    <SearchIconContainer
                                        src={SearchIcon}
                                        onClick={() => calcRoute()}
                                    ></SearchIconContainer>
                                </RouteContainer>
                                <AddtoFavContainer>
                                    <SelectedTypeContainer>
                                        <SelectedType
                                            name='layerSaved'
                                            id='placeSaved'
                                            onChange={(e) => setTypeSaved(e.target.value)}
                                        >
                                            <Option value=''>Selected Type</Option>
                                            <Option value='hotel'>Hotel</Option>
                                            <Option value='attraction'>Attraction</Option>
                                            <Option value='restaurant'>Restaurant</Option>
                                            <Option value='transportation'>Transport</Option>
                                        </SelectedType>
                                    </SelectedTypeContainer>
                                    <AddtoFav onClick={() => addToFavorites()}>Add to Favorites</AddtoFav>
                                </AddtoFavContainer>
                            </LeftBarHeader>
                            <FavoritesContainer>
                                <FavoritesHeader>
                                    <FavLogo>FAVORITES</FavLogo>
                                </FavoritesHeader>
                                <GetPlaceSaved
                                    showOnMap={showOnMap}
                                    places={places}
                                    setPlaces={setPlaces}
                                    setShowMarkers={setShowMarkers}
                                />
                            </FavoritesContainer>
                        </LeftBar>
                    </LeftBarContainer>
                    <MapOutContainer
                        id='map'
                        style={{ height: '100%', width: '100%' }}
                        options={mapOptions}
                    ></MapOutContainer>
                    <RightBarContainer isOpen={isRightBarOpen}>
                        <TripsSchedule modalOpen={modalOpen}></TripsSchedule>
                    </RightBarContainer>
                </MainPageContainer>
            </OutSide>
            {modalOpen ? (
                <AddTripPopUpModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    openModal={openModal}
                ></AddTripPopUpModal>
            ) : null}
        </>
    );
}
