import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError, clearFeedback } from '../store/feedbackSlice';
import { getAllCars } from '../services/carService';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSlides = async () => {
      dispatch(clearFeedback());
      try {
        const data = await getAllCars();
        setSlides(data);
        setLoading(false);
      } catch (error) {
        dispatch(setError(error.message));
        setLoading(false);
      }
    };
    fetchSlides();
  }, [dispatch]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const book = () => {
    if (slides[index]) {
      navigate(`/booking/${slides[index]._id}/${slides[index].name}`);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(nextSlide, 2000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <>
      {loading && <p>Loading cars...</p>}

      {!loading && slides.length > 0 && (
        <div className="carousel-container">
          <div className="carousel-slide">
            <img src={slides[index]?.image} alt={`Slide ${index + 1}`} style={{maxHeight: '83vh', padding: '2vh 0 0'}}/>
            <div className="carousel-caption mt-4">
              <h4 className='text-white'>Rent A Car</h4>
              <h1 className="text-uppercase text-white mb-4">{slides[index]?.name}</h1>
              <button className="btn btn-primary px-3 mr-3" onClick={book}>Reserve Now</button>
            </div>
          </div>
          <button className="carousel-control prev" onClick={prevSlide}>‹</button>
          <button className="carousel-control next" onClick={nextSlide}>›</button>
        </div>
      )}

      {!loading && slides.length === 0 && <p>No cars available.</p>}
    </>
  );
};

export default Home;
