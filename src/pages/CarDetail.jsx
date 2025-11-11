import { useParams } from 'react-router-dom';

const mockCars = [
  {
    id: '1',
    image: '/img/car-rent-1.png',
    title: 'Mercedes Benz R3',
    year: '2015',
    transmission: 'AUTO',
    mileage: '25K',
    price: '99.00',
    description: 'A reliable and stylish sedan perfect for city and highway driving.',
  },
  {
    id: '2',
    image: '/img/car-rent-2.png',
    title: 'BMW X5',
    year: '2018',
    transmission: 'AUTO',
    mileage: '30K',
    price: '120.00',
    description: 'Luxury SUV with comfort, performance, and space for the whole family.',
  },
  // Add more mock cars as needed
];

const CarDetail = () => {
  const { id } = useParams();
  const car = mockCars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="container py-5 ">
        <h2 className="text-center text-danger">Car not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5 mb-5">
      <div className="row" style={{marginTop: '1,5em'}}>
        <div className="col-md-6">
          <img src={car.image} alt={car.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h2 className="text-uppercase">{car.title}</h2>
          <p className="text-muted">{car.description}</p>
          <ul className="list-unstyled">
            <li><strong>Year:</strong> {car.year}</li>
            <li><strong>Transmission:</strong> {car.transmission}</li>
            <li><strong>Mileage:</strong> {car.mileage}</li>
            <li><strong>Price:</strong> ${car.price}/day</li>
          </ul>
          <a href={`/booking/${car.id}`} className="btn btn-primary mt-3">Book Now</a>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
