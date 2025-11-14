import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
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
  console.log('Filled via async:', locationCoords); // ✅ now it's usable
})();

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAvvycz7lLgGajPvMgu37mt9-OgtrC_b_c',
  });

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
