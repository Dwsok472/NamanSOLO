import React, { useState, useEffect } from 'react';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: new window.google.maps.LatLng(37.5665, 126.978), // 서울 좌표
        zoom: 13,
      };
      const mapInstance = new window.google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      setMap(mapInstance);

      mapInstance.addListener('click', (event) => {
        const clickedLocation = event.latLng;
        if (marker) {
          marker.setPosition(clickedLocation);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: clickedLocation,
            map: mapInstance,
          });
          setMarker(newMarker);

          const newInfoWindow = new window.google.maps.InfoWindow({
            content: document.getElementById('infoWindowContent'),
          });
          setInfoWindow(newInfoWindow);

          newMarker.addListener('click', () => {
            newInfoWindow.open(mapInstance, newMarker);
          });
        }
      });
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAko5KNj0EEUrRO8tk3_OxVpxy6vQJKmi8&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [marker]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchInput }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const newLocation = results[0].geometry.location;
        map.setCenter(newLocation);
        if (marker) {
          marker.setPosition(newLocation);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: newLocation,
            map: map,
          });
          setMarker(newMarker);
        }
      } else {
        alert('주소를 찾을 수 없습니다.');
      }
    });
  };

  return (
    <div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div id="infoWindowContent" style={{ display: 'none' }}>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="주소를 입력하세요"
        />
        <button onClick={handleSearchSubmit}>검색</button>
      </div>
    </div>
  );
};

export default MapComponent;
