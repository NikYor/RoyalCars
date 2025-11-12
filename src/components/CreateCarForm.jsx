import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/carService';
import FormInput from './FormInput';

const CreateCarForm = () => {
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
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Unauthorized');
      }
      const res = await createCar({ ...formData, lat: +formData.lat, lng: +formData.lng, status: formData.status || 'free', price: +formData.price }, token);
      setMessage(res.message);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-5 w-50">
      <h2 className="text-center mb-4">Create New Car</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'category', 'info', 'date', 'location', 'lat', 'lng', 'status', 'price', 'image'].map((field) => (
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
        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCarForm;
