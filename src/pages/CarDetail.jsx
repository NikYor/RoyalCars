// import { useParams, Link } from 'react-router-dom';
// import { getCarById } from '../services/carService';
// import React, { useEffect, useState } from 'react';
// import { socket } from "../utils/socket";
// import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
// import { useSelector } from "react-redux";

// const containerStyle = {
//   width: "100%",
//   height: "73vh",
// };

// const CarDetail = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [carStatus, setCarStatus] = useState('free')
//   const [carMileage, setCarMileage] = useState(0)
//   const [position, setPosition] = useState({ lat: 42.6977, lng: 23.3219 });
//   const [status, setStatus] = useState("scheduled");
//   const [route, setRoute] = useState([]);
//   const isLoaded = useSelector((state) => state.maps.isLoaded);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const carData = await getCarById(id);
//         setCar(carData);
//         setCarMileage(carData.mileage)
//         setPosition({ lat: carData.lat, lng: carData.lng });
//       } catch (error) {
//         console.error('Error fetching car details:', error);
//       }
//     };
//     fetchCar();

//     socket.on("newRoute", (data) => {
//       if (data.carId === id) {
//         setPosition({ lat: data.lat, lng: data.lng });
//         setCarStatus(data.carStatus);
//         setRoute([]);
//       }
//     });

//     socket.on("carUpdate", (data) => {
//       if (data.carId === id) {
//         setPosition({ lat: data.lat, lng: data.lng });
//         setStatus(data.status);
//         setCarStatus(data.carStatus);
//         setRoute((prev) => [...prev, { lat: data.lat, lng: data.lng }]);
//       }
//     });

//     socket.on("complete", (data) => {
//       if (data.carId === id) {
//         setStatus(data.status);
//         setCarStatus(data.carStatus)
//         setCarMileage(data.carMileage)
//       }
//     });

//     return () => {
//       socket.off("carUpdate");
//       socket.off("newRoute");
//       socket.off("complete");
//     };
//   }, [id]);

//   if (!car) {
//     return (
//       <div className="container py-5 ">
//         <h2 className="text-center text-danger">Car not found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="containe py-5 px-5" style={{ height: '83vh' }}>
//       <div className="row" style={{ marginTop: '1,5em' }}>
//         <div className="col-md-4">
//           <img src={car.image} alt={car.title} className="img-fluid rounded" />
//           <div className="mt-5">
//             <h2 className="text-uppercase">{car.name}</h2>
//             <p className="text-muted">{car.info}</p>
//             <ul className="list-unstyled">
//               <li><strong>Date:</strong> {car.date}</li>
//               <li><strong>Owner:</strong> {car.createdBy.email}</li>
//               <li><strong>Mileage:</strong> {carMileage} km</li>
//               <li><strong>Status:</strong> {carStatus}</li>
//               <li><strong>Price:</strong> ${car.price}/day</li>
//             </ul>
//             {/* <a href={`/booking/${car.id}/${car.title}`} className="btn btn-primary mt-3 mb-3">Book Now</a> */}
//             {car.name && <Link to={`/booking/${id}/${car.name}`} className="btn btn-primary mt-3 mb-3 rounded-pill">Book Now
//             </Link>}
//           </div>
//         </div>
//         {isLoaded && (
//           <div className="col-md-8">
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={position}
//               zoom={13}
//             >
//               <Marker position={position} />
//               {route.length > 1 && (
//                 <Polyline
//                   path={route}
//                   options={{ strokeColor: "#0000FF", strokeOpacity: 0.8, strokeWeight: 2 }}
//                 />
//               )}
//             </GoogleMap>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarDetail;


import { useParams, Link } from 'react-router-dom';
import { getCarById } from '../services/carService';
import React, { useEffect, useState, useRef } from 'react';
import { socket } from "../utils/socket";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "73vh",
};

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [carStatus, setCarStatus] = useState('free')
  const [carMileage, setCarMileage] = useState(0)
  const [position, setPosition] = useState({ lat: 42.6977, lng: 23.3219 });
  const [animatedPosition, setAnimatedPosition] = useState({ lat: 42.6977, lng: 23.3219 });
  const [status, setStatus] = useState("scheduled");
  const [route, setRoute] = useState([]);
  const isLoaded = useSelector((state) => state.maps.isLoaded);
  
  const animationRef = useRef(null);
  const previousPositionRef = useRef(null);

  // Smooth animation function
  const animateMarker = (startPos, endPos, duration = 2000) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth movement
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Interpolate between start and end positions
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
    // Initialize previous position
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
        
        // Animate to new position
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
        
        // Animate to new position
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
      
      // Cleanup animation
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
          <img src={car.image} alt={car.title} className="img-fluid rounded" />
          <div className="mt-5">
            <h2 className="text-uppercase">{car.name}</h2>
            <p className="text-muted">{car.info}</p>
            <ul className="list-unstyled">
              <li><strong>Date:</strong> {car.date}</li>
              <li><strong>Owner:</strong> {car.createdBy.email}</li>
              <li><strong>Mileage:</strong> {carMileage} km</li>
              <li><strong>Status:</strong> {carStatus}</li>
              <li><strong>Price:</strong> ${car.price}/day</li>
            </ul>
            {car.name && <Link to={`/booking/${id}/${car.name}`} className="btn btn-primary mt-3 mb-3 rounded-pill">Book Now
            </Link>}
          </div>
        </div>
        {isLoaded && (
          <div className="col-md-8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={animatedPosition} // Use animated position for smooth map centering
              zoom={13}
            >
              <Marker 
                position={animatedPosition} 
                icon={{
                  url: 'data:image/svg+xml;base64,' + btoa(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 2C10.48 2 6 6.48 6 12C6 17.52 16 30 16 30C16 30 26 17.52 26 12C26 6.48 21.52 2 16 2Z" fill="#EA4335"/>
                      <path d="M16 7C13.24 7 11 9.24 11 12C11 14.76 13.24 17 16 17C18.76 17 21 14.76 21 12C21 9.24 18.76 7 16 7Z" fill="white"/>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(32, 32),
                  anchor: new window.google.maps.Point(16, 32)
                }}
              />
              {route.length > 1 && (
                <Polyline
                  path={route}
                  options={{ 
                    strokeColor: "#FF0000", 
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