import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PocTest from './pages/PocTest';
import AutoComplete from './pages/AutoComplete';
// import GoogleMap from './pages/GoogleMap';
import Test from './pages/Test';
import GoogleLogin from './pages/GoogleLogin';
import App from './App';
import GetPlaceSaved from './components/utils/firebase/GetPlaceSaved';
import Home from './pages/Home/Home';
import Trips from './pages/Trips/Trips';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='Home' element={<Home />} />
                <Route path='Trips' element={<Trips />} />
                <Route path='PocTest' element={<PocTest />} />
                <Route path='Test' element={<Test />} />
                <Route path='AutoComplete' element={<AutoComplete />} />
                <Route path='GoogleLogin' element={<GoogleLogin />} />
                <Route path='GetPlaceSaved' element={<GetPlaceSaved />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

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
