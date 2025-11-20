import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCarById, updateCar } from '../services/carService';
import FormInput from '../components/FormInput';
import LocationPicker from '../components/LocationPicker';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';

const EditCarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    transmission: '',
    mileage: '',
    date: '',
    lat: '',
    lng: '',
    price: '',
    image: '',
    status: 'free',
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
          transmission: car.transmission || '',
          mileage: car.mileage?.toString() || '',
          date: car.date || '',
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

  const handleLocationSelect = ({ lat, lng }) => {
    setFormData(prev => ({
      ...prev,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    }));
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
    <div className="container-fluid" style={{ padding: '10px 15px' }}>
      <h2 className="text-center mb-4">Edit Car</h2>
      <div className="mb-4 d-flex">
        <form onSubmit={handleSubmit} className='w-50 mr-3'>
          {[
            'name', 'transmission', 'mileage', 'date',
            'status', 'price', 'image',
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

          {/* Read-only lat/lng fields */}
          <FormInput
            label="Latitude"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            readOnly
          />
          <FormInput
            label="Longitude"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            readOnly
          />
          <div className='justify-content-center d-flex gap-3'>
            <button type="submit" className="btn btn-primary w-50 rounded-pill mr-5">UPDATE</button>
            <button
              type="button"
              className="btn btn-secondary w-50 rounded-pill ml-5"
              onClick={() => navigate('/cars/manage')}
            >
              CANCEL
            </button>
          </div>
        </form>
        <div className='w-50 d-flex flex-column justify-content-center'>
          <div className="form-label mb-2" >SELECT LOCATION</div>
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div>
      </div>
    </div>
  );
};

export default EditCarForm;
