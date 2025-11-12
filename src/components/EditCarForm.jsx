import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarById, updateCar } from '../services/carService';
import FormInput from './FormInput';

const EditCarForm = () => {
  const { id } = useParams();
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
    status: '',
    image: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token');
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
          image: car.image || '',
        });
      } catch (err) {
        setError('Failed to load car data');
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const updated = {
        ...formData,
        lat: +formData.lat,
        lng: +formData.lng,
        status: formData.status || 'free',
        price: +formData.price,
      };
      const res = await updateCar(id, updated, token);
      setMessage(res.message || 'Car updated successfully');
      navigate('/cars/manage');
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  return (
    <div className="container py-5 w-50">
      <h2 className="text-center mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'category', 'info', 'date', 'location', 'lat', 'lng', 'price', 'status', 'image'].map((field) => (
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
        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default EditCarForm;
