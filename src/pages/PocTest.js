import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
const Img = styled.img`
    width: 100%;
    margin-top: 10px;
`;

let cachedScripts = [];
function useScript(src) {
    // Keeping track of script loaded and error state   //load SDK 初始資料 （收）

    const [state, setState] = useState({
        loaded: false,
        error: false,
    });

    useEffect(
        () => {
            // If cachedScripts array already includes src that means another instance ...
            // ... of this hook already loaded this script, so no need to load again.
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,

                    error: false,
                });
            } else {
                cachedScripts.push(src);
                // Create script
                let script = document.createElement('script');
                script.src = src;
                script.async = true;
                // Script event listener callbacks for load and error
                const onScriptLoad = () => {
                    setState({
                        loaded: true,
                        error: false,
                    });
                };

                const onScriptError = () => {
                    // Remove from cachedScripts we can try loading again
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
                // Add script to document body
                document.body.appendChild(script);
                // Remove event listeners on cleanup
                return () => {
                    script.removeEventListener('load', onScriptLoad);
                    script.removeEventListener('error', onScriptError);
                };
            }
        },
        [src] // Only re-run effect if script src changes
    );
    return [state.loaded, state.error];
}

function Map() {
    const [loaded, error] = useScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap'
    ); //憑證
    const [map, setDataMap] = useState();
    const [from, setFrom] = useState(''); //起始地點，要加個to

    useEffect(() => {
        if (loaded) {
            //load到才會執行
            const map = new window.google.maps.Map(document.getElementById('map'), {
                //div render map
                zoom: 20, //zoom in
                center: { lat: 25.033964, lng: 121.564468 }, //初始經緯度 （替換）
                mapTypeId: window.google.maps.MapTypeId.ROADMAP, //一般地圖
            });

            setDataMap(map);
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
            destination: 'AppWorks School', //存一個state 控制
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
                    id='from'
                    placeholder='你在哪裏?'
                    className='form-control'
                    onChange={(e) => setFrom(e.target.value)} //起始點隨意，要再加一個to (目前寫死)
                />
                <SearchButton onClick={() => calcRoute()}>搜尋</SearchButton>
            </SearchGroup>
            <GoogleMap>
                <div id='map' style={{ height: '700px', width: '1280px', border: `20px solid #88C8EC` }} />
            </GoogleMap>
        </Wrapper>
    );
}
export default Map;
