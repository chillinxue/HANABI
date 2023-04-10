// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

// const Map = styled.div``;
// const SearchBar = styled.div``;
// const OutSide = styled.div``;

// function GoogleMap() {
//     const [map, setMap] = useState(null);
//     const [currentPosition, setCurrentPosition] = useState(null);
//     const [address, setAddress] = useState('');
//     const [coordinates, setCoordinates] = useState({
//         lat: null,
//         lng: null,
//     });
//     const handleSelect = async (value) => {
//         const results = await geocodeByAddress(value);
//         const ll = await getLatLng(results[0]);
//         console.log(ll);
//         setAddress(value);
//         setCoordinates(ll);
//         if (map) {
//             map.panTo(ll);
//             map.setZoom(16);

//             new google.maps.Marker({
//                 position: ll,
//                 map: map,
//                 title: value,
//             });
//         }
//     };

//     useEffect(() => {
//         function initMap() {
//             const map = new window.google.maps.Map(document.getElementById('map'), {
//                 center: { lat: 23.5533118, lng: 121.0211 },
//                 zoom: 7,
//             });

//             navigator.geolocation.getCurrentPosition(function (position) {
//                 const currentPosition = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//                 setCurrentPosition(currentPosition);
//                 map.setCenter(currentPosition);
//                 map.setZoom(16);

//                 new google.maps.Marker({
//                     position: currentPosition,
//                     map: map,
//                     title: 'My Location',
//                 });
//             });

//             setMap(map);
//         }

//         if (!window.google) {
//             const script = document.createElement('script');
//             script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCszxEdzSyD5fLI9-m_nRiUr6GEbeIfTG4&libraries=places&callback=initMap`;
//             script.async = true;
//             document.body.appendChild(script);
//         } else {
//             initMap();
//         }
//     }, []);

//     useEffect(() => {
//         if (map) {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 const currentPosition = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };
//                 setCurrentPosition(currentPosition);
//                 map.setCenter(currentPosition);
//                 map.setZoom(16);
//             });
//         }
//     }, [map]);

//     return (
//         <>
//             <OutSide>
//                 <Map>
//                     <div style={{ display: 'flex' }}>
//                         <div id='map' style={{ width: '50%', height: '100vh' }}></div>
//                     </div>
//                 </Map>
//                 <SearchBar></SearchBar>
//                 <p>lat: {coordinates.lat}</p>
//                 <p>lng: {coordinates.lng}</p>
//                 <p>Address: {address}</p>
//                 <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
//                     {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                         <div>
//                             <input
//                                 {...getInputProps({
//                                     placeholder: 'Search Places ...',
//                                     className: 'location-search-input',
//                                 })}
//                             />
//                             <div className='autocomplete-dropdown-container'>
//                                 {loading && <div>Loading...</div>}
//                                 {suggestions.map((suggestion) => {
//                                     const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
//                                     // inline style for demonstration purpose
//                                     const style = suggestion.active
//                                         ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                                         : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                                     return (
//                                         <div
//                                             {...getSuggestionItemProps(suggestion, {
//                                                 className,
//                                                 style,
//                                             })}
//                                         >
//                                             <span>{suggestion.description}</span>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     )}
//                 </PlacesAutocomplete>
//             </OutSide>
//         </>
//     );
// }

// export default GoogleMap;
