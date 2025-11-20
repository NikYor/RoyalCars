import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const containerStyle = {
  width: '100%',
  height: '70vh',
  boxShadow: "1px 2px 18px 0px rgba(0,0,0,0.63)"
};

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => reject(error)
    );
  });
}

let locationCoords = null;

(async () => {
  locationCoords = await getLocation();
})();

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  const [marker, setMarker] = useState(null);
  const isLoaded = useSelector((state) => state.maps.isLoaded);

  useEffect(() => {
    if (initialPosition?.lat && initialPosition?.lng) {
      setMarker(initialPosition);
    }
  }, [initialPosition]);

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const newMarker = { lat, lng };
    setMarker(newMarker);
    onLocationSelect(newMarker);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialPosition ? initialPosition : locationCoords}
      zoom={8}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default LocationPicker;
