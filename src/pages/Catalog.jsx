import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import { getAllCars } from '../services/carService';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (err) {
        setError('Failed to load cars');
        console.error(err);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="container-fluid py-5" style={{height: '83vh'}}>
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
