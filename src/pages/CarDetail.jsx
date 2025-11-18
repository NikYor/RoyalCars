import { useParams, Link } from 'react-router-dom';
import { getCarById } from '../services/carService';
import React, { useEffect, useState } from 'react';
import { socket } from "../utils/socket";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [carStatus, setCarStatus] = useState('free')
  const [position, setPosition] = useState({ lat: 42.6977, lng: 23.3219 });
  const [status, setStatus] = useState("scheduled");
  const [route, setRoute] = useState([]);
  const isLoaded = useSelector((state) => state.maps.isLoaded);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
        setPosition({ lat: carData.lat, lng: carData.lng });
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCar();

    socket.on("newRoute", (data) => {
      if (data.carId === id) {
        setPosition({ lat: data.lat, lng: data.lng });
        setCarStatus(data.carStatus);
        setRoute([]);
      }
    });

    socket.on("carUpdate", (data) => {
      if (data.carId === id) {
        setPosition({ lat: data.lat, lng: data.lng });
        setStatus(data.status);
        setCarStatus(data.carStatus);
        setRoute((prev) => [...prev, { lat: data.lat, lng: data.lng }]);
      }
    });

    socket.on("complete", (data) => {
      if (data.carId === id) {
        setStatus(data.status);
        setCarStatus(data.carStatus)
      }
    });

    return () => {
      socket.off("carUpdate");
      socket.off("newRoute");
      socket.off("complete");
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
    <div className="container py-5 mt-5 mb-5" style={{height: '73vh'}}>
      <div className="row" style={{marginTop: '1,5em'}}>
        <div className="col-md-6">
          <img src={car.image} alt={car.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2 className="text-uppercase">{car.name}</h2>
          <p className="text-muted">{car.info}</p>
          <ul className="list-unstyled">
            <li><strong>Date:</strong> {car.date}</li>
            <li><strong>Owner:</strong> {car.createdBy.email}</li>
            <li><strong>Mileage:</strong> {car.mileage} km</li>
            <li><strong>Status:</strong> {carStatus}</li>
            <li><strong>Price:</strong> ${car.price}/day</li>
          </ul>
          {/* <a href={`/booking/${car.id}/${car.title}`} className="btn btn-primary mt-3 mb-3">Book Now</a> */}
          {car.name && <Link to={`/booking/${id}/${car.name}`} className="btn btn-primary mt-3 mb-3">Book Now
          </Link>}
        </div>
      </div>
      {isLoaded && (
        <>
        <h4>{status}</h4>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
        >
          <Marker position={position} />
          {route.length > 1 && (
            <Polyline
              path={route}
              options={{ strokeColor: "#0000FF", strokeOpacity: 0.8, strokeWeight: 2 }}
            />
          )}
        </GoogleMap>
        </>
      )}
    </div>
  );
};

export default CarDetail;
