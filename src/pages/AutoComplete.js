import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { useState } from 'react';

export default function AutoComplete() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    });

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        console.log(ll);
        setAddress(value);
        setCoordinates(ll);
    };
    return (
        <>
            <p>lat: {coordinates.lat}</p>
            <p>lng: {coordinates.lng}</p>
            <p>Address: {address}</p>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className='autocomplete-dropdown-container'>
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </>
    );
}
// function initMap() {
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       zoom: 13,
//       center: { lat: 25.042385, lng: 121.509063 },
//     });

//     const infowindow = new window.google.maps.InfoWindow();

//     const service = new window.google.maps.places.PlacesService(map);

//     map.addListener("click", async (event) => {
//       const { latLng } = event;
//       const request = {
//         location: latLng,
//         radius: 500,
//         fields: ["place_id", "name", "formatted_address", "formatted_phone_number", "rating"],
//       };
//       service.nearbySearch(request, (results, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
//           const placeId = results[0].place_id;
//           const name = results[0].name;
//           const address = results[0].formatted_address;
//           const phone = results[0].formatted_phone_number;
//           const rating = results[0].rating;

//           fetch(
//             `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,rating&key=${apiKey}`
//           )
//             .then((response) => response.json())
//             .then((data) => {
//               const placeData = data.result;
//               const name = placeData.name;
//               const address = placeData.formatted_address;
//               const phone = placeData.formatted_phone_number;
//               const rating = placeData.rating;

//               infowindow.setContent(`<div><strong>${name}</strong><br>${address}<br>Phone: ${phone}<br>Rating: ${rating}</div>`);
//               infowindow.setPosition(latLng);
//               infowindow.open(map);
//             });
//         }
//       });
//     });
//     setDataMap(map);
//   }
