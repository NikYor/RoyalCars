import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CarCard from '../components/CarCard';
import { getAllCars } from '../services/carService';
import { setError, clearFeedback } from '../store/feedbackSlice';

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCars = async () => {
      dispatch(clearFeedback());
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (err) {
        dispatch(setError('Failed to load cars'));
      }
    };

    fetchCars();
  }, [dispatch]);

  return (
    <div className="container-fluid p-0">
      <div className="p-5 pb-3 catalog-scroll">
        <h1 className="display-4 text-uppercase text-center mb-5">Car Catalog</h1>
        <div className="row ">
          {cars.map((car, index) => (
            <CarCard
              key={index}
              id={car._id}
              image={car.image || '/img/default-car.png'}
              title={car.name}
              year={car.date}
              transmission={car.transmission}
              mileage={car.mileage}
              price={car.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
