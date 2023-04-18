import styled from 'styled-components';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MapLabel = styled.div`
    font-size: 20px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px 100px;
    margin-bottom: 150px;
`;
const GoogleMapContainer = styled.div`
    display: flex;
`;
const MapSavedContainer = styled.div`
    border: 1px black solid;
    width: 500px;
    padding: 10px;
`;
const MapContainer = styled.div`
    display: flex;
    gap: 50px;
    width: 100%;
    margin-top: 60px;
`;
const SearchGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const SearchButton = styled.button`
    width: 300px;
    height: 50px;
    font-size: 18px;
    background-color: #88c8ec;
    color: white;
    &:hover {
        background-color: #88c8ec;
    }
`;
export default function RouteSearchBar() {
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
    const [places, setPlaces] = useState();
    // const inputRef = useRef(null);

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [
                { lat: 35.682518, lng: 139.765804 },
                { lat: 35.487404, lng: 138.795665 },
                { lat: 35.503593, lng: 138.7634713 },
                { lat: 35.4988753, lng: 138.76763 },
            ];
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
        }
    }, [loaded]);
    if (!loaded) {
        return;
    }

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

    if (locationInfo !== null) {
        // console.log('locationInfo:', locationInfo.geometry);
    } else {
    }
    // console.log('places', places);
    return (
        <Wrapper>
            <SearchGroup>
                <MapLabel>搜尋路徑</MapLabel>
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
                <SearchButton onClick={() => calcRoute()}>搜尋</SearchButton>
            </SearchGroup>
            <GoogleMapContainer>
                <MapSavedContainer></MapSavedContainer>
                <MapContainer>
                    <div id='map' style={{ height: '700px', width: '1280px', border: `20px solid #88C8EC` }} />
                </MapContainer>
            </GoogleMapContainer>
        </Wrapper>
    );
}
