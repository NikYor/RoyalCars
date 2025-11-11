// import { useEffect } from 'react';
// import CarCard from '../components/CarCard';

// const Catalog = () => {
//   const cars = [
//     {
//       image: '/img/car-rent-1.png',
//       title: 'Mercedes Benz R3',
//       year: '2015',
//       transmission: 'AUTO',
//       mileage: '25K',
//       price: '99.00',
//     },
//     {
//       image: '/img/car-rent-2.png',
//       title: 'BMW X5',
//       year: '2018',
//       transmission: 'AUTO',
//       mileage: '30K',
//       price: '120.00',
//     },
//     {
//       image: '/img/car-rent-3.png',
//       title: 'Audi A6',
//       year: '2017',
//       transmission: 'MANUAL',
//       mileage: '40K',
//       price: '110.00',
//     },
//     {
//       image: '/img/car-rent-4.png',
//       title: 'Tesla Model 3',
//       year: '2020',
//       transmission: 'AUTO',
//       mileage: '15K',
//       price: '150.00',
//     },
//     {
//       image: '/img/car-rent-5.png',
//       title: 'Volkswagen Passat',
//       year: '2016',
//       transmission: 'MANUAL',
//       mileage: '35K',
//       price: '85.00',
//     },
//     {
//       image: '/img/car-rent-6.png',
//       title: 'Ford Mustang',
//       year: '2019',
//       transmission: 'AUTO',
//       mileage: '20K',
//       price: '130.00',
//     },
//   ];

//   useEffect(() => {
//     console.log('Fetching cars...');
//     // Simulate delay
//     setTimeout(() => {
//       console.log('Cars loaded');
//     }, 500);
//   }, [])

//   return (
//     <div className="container-fluid py-5">
//       <div className="container pt-5 pb-3">
//         <h1 className="display-4 text-uppercase text-center mb-5">Car Catalog</h1>
//         <div className="row">
//           {cars.map((car, index) => (
//             <CarCard key={index} {...car} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Catalog;


import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { getAllCars } from '../services/carService'; // adjust path if needed

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data); // assuming backend returns an array of car objects
      } catch (err) {
        setError('Failed to load cars');
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">Car Catalog</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="row">
          {cars.map((car, index) => (
            <CarCard
              key={index}
              image={car.image || '/img/default-car.png'}
              title={car.name}
              year={car.date}
              transmission={car.category}
              mileage={car.info}
              price={car.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
