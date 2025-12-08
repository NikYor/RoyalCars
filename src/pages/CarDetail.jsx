import { useParams, Link } from 'react-router-dom';
import { getCarById } from '../services/carService';
import { useEffect, useState, useRef } from 'react';
import { socket } from "../utils/socket";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "73vh",
  boxShadow: "1px 2px 18px 0px rgba(0,0,0,0.63)"
};

const CarDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [carStatus, setCarStatus] = useState('free')
  const [carMileage, setCarMileage] = useState(0)
  const [position, setPosition] = useState({ lat: 42.6977, lng: 23.3219 });
  const [animatedPosition, setAnimatedPosition] = useState({ lat: 42.6977, lng: 23.3219 });
  const [status, setStatus] = useState("scheduled");
  const [route, setRoute] = useState([]);
  const isLoaded = useSelector((state) => state.maps.isLoaded);
  const {cars} = useSelector((state) => state.completed);
  const animationRef = useRef(null);
  const previousPositionRef = useRef(null);

  const animateMarker = (startPos, endPos, duration = 2000) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentLat = startPos.lat + (endPos.lat - startPos.lat) * easeOutCubic;
      const currentLng = startPos.lng + (endPos.lng - startPos.lng) * easeOutCubic;

      setAnimatedPosition({
        lat: currentLat,
        lng: currentLng
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!previousPositionRef.current) {
      previousPositionRef.current = position;
      setAnimatedPosition(position);
    }
  }, []);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
        setCarMileage(carData.mileage)
        const initialPosition = { lat: carData.lat, lng: carData.lng };
        setPosition(initialPosition);
        setAnimatedPosition(initialPosition);
        previousPositionRef.current = initialPosition;
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCar();

    socket.on("newRoute", (data) => {
      if (data.carId === id) {
        const newPosition = { lat: data.lat, lng: data.lng };
        setPosition(newPosition);

        animateMarker(previousPositionRef.current, newPosition);
        previousPositionRef.current = newPosition;

        setCarStatus(data.carStatus);
        setRoute([]);
      }
    });

    socket.on("carUpdate", (data) => {
      if (data.carId === id) {
        const newPosition = { lat: data.lat, lng: data.lng };
        setPosition(newPosition);

        animateMarker(previousPositionRef.current, newPosition, 1500);
        previousPositionRef.current = newPosition;

        setStatus(data.status);
        setCarStatus(data.carStatus);
        setRoute((prev) => [...prev, { lat: data.lat, lng: data.lng }]);
      }
    });

    socket.on("complete", (data) => {
      if (data.carId === id) {
        setStatus(data.status);
        setCarStatus(data.carStatus)
        setCarMileage(data.carMileage)
      }
    });

    return () => {
      socket.off("carUpdate");
      socket.off("newRoute");
      socket.off("complete");

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [id]);

  if (!car) {
    return (
      <div className="container py-5 ">
        <h2 className="text-center text-danger">Car not found</h2>
      </div>
    );
  }

  return (
    <div className="containe py-5 px-5">
      <div className="row" style={{ marginTop: '1,5em' }}>
        <div className="col-md-4">
          <img src={car.image} alt={car.title} className="responsive-img" />
          <div className="mt-5">
            <h2 className="text-uppercase">{car.name}</h2>
            <p className="text-muted">{car.info}</p>
            <ul className="list-unstyled">
              <li><strong>Date:</strong> {car.date}</li>
              <li><strong>Owner:</strong> {car.createdBy.email}</li>
              <li><strong>Mileage:</strong> {carMileage} km</li>
              <li><strong>Status:</strong> {carStatus}</li>
              <li><strong>Price:</strong> ${car.price}/h</li>
            </ul>
            {car.name && <Link to={`/booking/${id}/${car.name}`} className="btn btn-primary mt-3 mb-3 rounded-pill">Book Now
            </Link>}
          </div>
        </div>
        {isLoaded && (
          <div className="col-md-8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={animatedPosition}
              zoom={13}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true
              }}
            >
              <Marker
                position={animatedPosition}
              />
              {route.length > 1 && (
                <Polyline
                  path={route}
                  options={{
                    strokeColor: "#30a026ff",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    icons: [{
                      icon: {
                        path: 'M 0,-1 0,1',
                        strokeOpacity: 1,
                        scale: 2
                      },
                      offset: '0',
                      repeat: '10px'
                    }]
                  }}
                />
              )}
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetail;