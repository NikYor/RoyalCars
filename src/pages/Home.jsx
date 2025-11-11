import CarCard from '../components/CarCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [linkBooking, setLinkBooking] = useState(null);
 
  const navigate = useNavigate();

  const slides = [
    {
      image: '/img/car-rent-1.png',
      title: 'Mercedes Benz R3',
      year: '2015',
      transmission: 'AUTO',
      mileage: '25K',
      price: '99.00',
    },
    {
      image: '/img/car-rent-2.png',
      title: 'BMW X5',
      year: '2018',
      transmission: 'AUTO',
      mileage: '30K',
      price: '120.00',
    },
    {
      image: '/img/car-rent-3.png',
      title: 'Audi A6',
      year: '2017',
      transmission: 'MANUAL',
      mileage: '40K',
      price: '110.00',
    }
  ];

  const nextSlide = () => setIndex((index + 1) % slides.length);
  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);

  const book = () => {
    setLinkBooking(navigate('/booking/' + (index + 1)));
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // 2 seconds
    return () => clearInterval(interval); // cleanup
  }, [index]);

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-slide">
          <img src={slides[index].image} alt={`Slide ${index + 1}`} />
          <div className="carousel-caption">
            <h4>Rent A Car</h4>
            <h1>{slides[index].title}</h1>
            <button className="reserve-btn" onClick={book}>Reserve Now</button>
          </div>
        </div>
        <button className="carousel-control prev" onClick={prevSlide}>‹</button>
        <button className="carousel-control next" onClick={nextSlide}>›</button>
      </div>

    </>
  );
};

export default Home;
