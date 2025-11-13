import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCar } from '../services/carService';
import FormInput from './FormInput';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';

const CreateCarForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    info: '',
    date: '',
    location: '',
    lat: '',
    lng: '',
    price: '',
    image: '',
    status: 'free',
  });

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
        return;
      }

      const payload = {
        ...formData,
        lat: +formData.lat,
        lng: +formData.lng,
        price: +formData.price,
      };

      const res = await createCar(payload, token);
      dispatch(setMessage(res.message || 'Car created successfully'));
      navigate('/profile');
    } catch (err) {
      dispatch(setError(err.message || 'Failed to create car'));
    }
  };

  return (
    <div className="container py-5 w-50">
      <h2 className="text-center mb-4">Create New Car</h2>
      <form onSubmit={handleSubmit}>
        {[
          'name', 'category', 'info', 'date',
          'location', 'lat', 'lng', 'status',
          'price', 'image',
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
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default CreateCarForm;
