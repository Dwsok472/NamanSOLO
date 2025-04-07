import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h3`
color: black;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  background-color: #ffffff;
  color: black;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.8rem;
  &:hover {
    color: #a1a1a1;
  }
`;

const PredictionList = styled.ul`
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 5px 0 10px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  &::-webkit-scrollbar {
    width: 7px; /* 세로 스크롤바의 너비를 8px로 설정 */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #727272; /* 핸들의 색상 */
    border-radius: 10px;
  }
`;

const PredictionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 0.8rem;
  text-align: start;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MapView = styled.div`
  width: 100%;
  /* height: 400px; */
  min-height: 280px;
  border: 1px solid #ccc;
  margin-top: 10px;
`;

const AddressText = styled.p`
  margin-top: 10px;
  font-weight: 500;
`;

const MapPicker = ({ onSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAko5KNj0EEUrRO8tk3_OxVpxy6vQJKmi8&libraries=places`;
    script.async = true;
    script.onload = () => initMap();
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const seoul = { lat: 37.5665, lng: 126.9780 };
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: seoul,
      zoom: 13,
    });
    setMap(mapInstance);
  };

  const handleSearchInput = async (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (!input || !window.google?.maps?.places) {
      setPredictions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (preds) => {
      setPredictions(preds || []);
    });
  };

  const handleSelectPlace = (placeId, description) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        placeMarker(location, results[0].formatted_address);
        setSearchInput(description);
        setPredictions([]);
      }
    });
  };

  const placeMarker = (location, address = '') => {
    if (!map) return;

    if (marker) marker.setMap(null);

    const newMarker = new window.google.maps.Marker({
      position: location,
      map,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });

    newMarker.addListener('click', () => {
      if (address) {
        setSelectedAddress(address);
      }
    });

    setMarker(newMarker);
    map.panTo(location);

    if (address) setSelectedAddress(address);

    if (onSelect) {
      onSelect({
        address,
        lat: location.lat(),
        lng: location.lng(),
      });
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 권한을 확인해주세요!');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = new window.google.maps.LatLng(latitude, longitude);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: loc }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;
            placeMarker(loc, address);
          }
        });
      },
      () => alert('현재 위치를 가져올 수 없습니다.')
    );
  };

  return (
    <MapContainer>
      <Title> 위치 검색</Title>
      <Controls>
        <Input
          type="text"
          value={searchInput}
          onChange={handleSearchInput}
          placeholder="장소를 입력하세요"
        />
        <Button onClick={handleCurrentLocation}>현재 위치</Button>
      </Controls>

      {predictions.length > 0 && (
        <PredictionList>
          {predictions.map((prediction) => (
            <PredictionItem
              key={prediction.place_id}
              onClick={() =>
                handleSelectPlace(prediction.place_id, prediction.description)
              }
            >
              {prediction.description}
            </PredictionItem>
          ))}
        </PredictionList>
      )}

      <MapView ref={mapRef} />

      {selectedAddress && (
        <AddressText>
          📌 선택된 주소: <strong>{selectedAddress}</strong>
        </AddressText>
      )}
    </MapContainer>
  );
};

export default MapPicker;
