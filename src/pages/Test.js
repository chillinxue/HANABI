import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px 100px;
    margin-bottom: 150px;
`;
const GoogleMap = styled.div`
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
const MapLabel = styled.div`
    font-size: 20px;
`;
const MapTitle = styled.div`
    font-size: 30px;
    font-weight: 700;
    padding-bottom: 20px;
`;

let cachedScripts = [];
// function useScript(src) {
//     // Keeping track of script loaded and error state   //load SDK 初始資料 （收）

//     const [state, setState] = useState({
//         loaded: false,
//         error: false,
//     });

//     useEffect(() => {
//         if (cachedScripts.includes(src)) {
//             setState({
//                 loaded: true,

//                 error: false,
//             });
//         } else {
//             cachedScripts.push(src);
//             let script = document.createElement('script');
//             script.src = src;
//             script.async = true;
//             const onScriptLoad = () => {
//                 setState({
//                     loaded: true,
//                     error: false,
//                 });
//             };

//             const onScriptError = () => {
//                 const index = cachedScripts.indexOf(src);
//                 if (index >= 0) cachedScripts.splice(index, 1);
//                 script.remove();
//                 setState({
//                     loaded: true,
//                     error: true,
//                 });
//             };
//             script.addEventListener('load', onScriptLoad);
//             script.addEventListener('error', onScriptError);
//             document.body.appendChild(script);
//             return () => {
//                 script.removeEventListener('load', onScriptLoad);
//                 script.removeEventListener('error', onScriptError);
//             };
//         }
//     }, [src]);
//     return [state.loaded, state.error];
// }
function useScript(src) {
    // Keeping track of script loaded and error state

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

function Test() {
    const [loaded, error] = useScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
    ); //憑證
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to
    const fromInputRef = useRef(null); // 新增起點 ref
    const toInputRef = useRef(null); // 新增終點 ref
    const [to, setTo] = useState(''); // 新增終點 state
    const [searchPlace, setSearchPlace] = useState();

    const marker = new window.google.maps.Marker({
        position: { lat: 35.503593, lng: 138.7634713 },
        map: map,
    });

    const infowindow = new window.google.maps.InfoWindow({
        content: '<div>InfoWindow Content</div>',
    });
    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const myLatLng = [
                { lat: 35.503593, lng: 138.7634713 },
                { lat: 35.487404, lng: 138.795665 },
                { lat: 35.503593, lng: 138.7634713 },
                { lat: 35.4988753, lng: 138.76763 },
            ];
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 20, //zoom in
                center: myLatLng[0], //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
            });

            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current);
            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current);

            fromAutocomplete.addListener('place_changed', () => {
                setFrom(fromAutocomplete.getPlace().formatted_address);
                console.log('fromAutocomplete', fromAutocomplete.getPlace().geometry);
                const lat = fromAutocomplete.getPlace().geometry.location.lat();
                const lng = fromAutocomplete.getPlace().geometry.location.lng();
                console.log(lat);
                console.log(lng);
                setSearchPlace(lat);
            });
            // console.log(searchPlace);

            toAutocomplete.addListener('place_changed', () => {
                setTo(toAutocomplete.getPlace().formatted_address);
                console.log('toAutocomplete', toAutocomplete.getPlace());

                toInputRef.current.value = toAutocomplete.getPlace().formatted_address;
            });

            const icons = {
                red: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
                blue: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
                green: {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
                    scaledSize: new window.google.maps.Size(50, 50),
                },
            };
            myLatLng.forEach((location, index) => {
                const marker = new window.google.maps.Marker({
                    position: location,
                    map,
                    icon: icons[index % 3 === 0 ? 'red' : index % 3 === 1 ? 'blue' : 'green'],
                });
            });
            setDataMap(map);
            console.log(toInputRef);
        }
    }, [loaded]);

    if (!loaded) {
        return;
    }

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
            console.log(status);
            if (status == window.google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result); //寫路線的功能
                console.log(result);
            } else {
                //delete route from map
                directionsDisplay.setDirections({ routes: [] });
                //center map in London
                map.setCenter({ lat: 25.033964, lng: 121.564468 });
                //show error message
            }
        });
    }

    return (
        <Wrapper>
            <SearchGroup>
                <MapTitle></MapTitle>
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
            <GoogleMap>
                <div id='map' style={{ height: '700px', width: '1280px', border: `20px solid #88C8EC` }} />
            </GoogleMap>
        </Wrapper>
    );
}
export default Test;
