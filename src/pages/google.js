import { useState, useEffect, useRef } from 'react';

function App() {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [marker, setMarker] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 23.5533118, lng: 121.0211 },
      zoom: 7,
    });
    setMap(map);

    // Get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setCurrentPosition(currentPosition);
      map.setCenter(currentPosition);
      map.setZoom(16);
    });
  }, []);

  useEffect(() => {
    // Load the restaurant list from local storage
    const savedList = JSON.parse(localStorage.getItem('restaurantList')) || [];
    setRestaurantList(savedList);

    // Add event listener to the "Add" button
    const addButton = document.getElementById('add');
    if (addButton) {
      addButton.addEventListener('click', () => {
        if (selectedRestaurant) {
          const newList = [...restaurantList, selectedRestaurant];
          setRestaurantList(newList);
          localStorage.setItem('restaurantList', JSON.stringify(newList));
          setSelectedRestaurant(null);
        }
      });
    }

    // Add event listener to the restaurant list
    const list = document.getElementById('restaurant-list');
    if (list) {
      list.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-close')) {
          const restaurantName = e.target.parentNode.innerText.trim();
          const newList = restaurantList.filter((restaurant) => restaurant.name !== restaurantName);
          setRestaurantList(newList);
          localStorage.setItem('restaurantList', JSON.stringify(newList));
        }
      });
    }
  }, [restaurantList, selectedRestaurant]);

  useEffect(() => {
    // Initialize the autocomplete object
    if (map && currentPosition && !autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('search-input'), {
        types: ['restaurant'],
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lng - 0.001,
          north: currentPosition.lng + 0.001,
        },
        strictBounds: false,
      });
      autocompleteRef.current = autocomplete;

      // Add event listener to the autocomplete object
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        setSelectedRestaurant({
          location: place.geometry.location,
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          rating: place.rating,
        });
      });
    }
  }, [map, currentPosition]);

  useEffect(() => {
    // Update the marker position when the selected restaurant changes
    if (map && selectedRestaurant) {
      if (!marker) {
        const marker = new window.google.maps.Marker({
          map: map,
        });
        setMarker(marker);
      }
    }
