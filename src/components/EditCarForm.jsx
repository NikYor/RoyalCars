import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCarById, updateCar } from '../services/carService';
import FormInput from './FormInput';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';

const EditCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    info: '',
    date: '',
    location: '',
    lat: '',
    lng: '',
    price: '',
    status: 'free',
    image: '',
  });

  useEffect(() => {
    const fetchCar = async () => {
      dispatch(clearFeedback());
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          dispatch(setError('Unauthorized'));
          navigate('/login');
          return;
        }

        const car = await getCarById(id, token);
        setFormData({
          name: car.name || '',
          category: car.category || '',
          info: car.info || '',
          date: car.date || '',
          location: car.location || '',
          lat: car.lat?.toString() || '',
          lng: car.lng?.toString() || '',
          price: car.price?.toString() || '',
          status: car.status || 'free',
          image: car.image || '',
        });
      } catch (err) {
        dispatch(setError('Failed to fetch car'));
      }
    };

    fetchCar();
  }, [id, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFeedback());

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(setError('Unauthorized'));
        navigate('/login');
        return;
      }

      const updated = {
        ...formData,
        lat: +formData.lat,
        lng: +formData.lng,
        price: +formData.price,
        status: formData.status || 'free',
      };

      const res = await updateCar(id, updated, token);
      dispatch(setMessage(res.message || 'Car updated successfully'));
      navigate('/cars/manage');
    } catch (err) {
      dispatch(setError('Failed to update car'));
    }
  };

  return (
    <div className="container py-5 w-50">
      <h2 className="text-center mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit}>
        {[
          'name', 'category', 'info', 'date',
          'location', 'lat', 'lng', 'price',
          'status', 'image',
        ].map((field) => (
          <FormInput
            key={field}
            label={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required={field !== 'image'}
          />
        ))}
        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default EditCarForm;
