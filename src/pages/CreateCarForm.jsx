import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCar } from '../services/carService';
import FormInput from '../components/FormInput';
import LocationPicker from '../components/LocationPicker';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';
import useForm from '../hooks/useForm';

const CreateCarForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, setValues, handleChange, handleSubmit } = useForm(
    {
      name: '',
      transmission: '',
      mileage: '',
      date: '',
      location: '',
      lat: '',
      lng: '',
      price: '',
      image: '',
      status: 'free',
    },
    async (formData) => {
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
    }
  );

  const handleLocationSelect = ({ lat, lng }) => {
    setValues((prev) => ({
      ...prev,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    }));
  };

  return (
    <div className="container-fluid" style={{ padding: '10px 15px' }}>
      <h2 className="text-center mb-4">Create New Car</h2>
      <div className="mb-4 d-flex">
        <form onSubmit={handleSubmit} className="w-50 mr-3">
          {[
            { name: 'name', type: 'text' },
            { name: 'transmission', type: 'text' },
            { name: 'mileage', type: 'number' },
            { name: 'date', type: 'date' },
            { name: 'price', type: 'number' },
            { name: 'image', type: 'url' },
          ].map(({ name, type }) => (
            <FormInput
              key={name}
              label={name}
              name={name}
              type={type}
              value={values[name]}
              onChange={handleChange}
              required={name !== 'image'}
            />
          ))}
          <FormInput
            label="Latitude"
            name="lat"
            value={values.lat}
            onChange={handleChange}
            required
            readOnly
          />
          <FormInput
            label="Longitude"
            name="lng"
            value={values.lng}
            onChange={handleChange}
            required
            readOnly
          />
          <div className="justify-content-center d-flex">
            <button type="submit" className="btn btn-primary w-50 rounded-pill mr-5">
              CREATE
            </button>
            <button
              type="button"
              className="btn btn-secondary w-50 rounded-pill ml-5"
              onClick={() => navigate('/profile')}
            >
              CANCEL
            </button>
          </div>
        </form>
        <div className="w-50 d-flex flex-column justify-content-center">
          <div className="form-label mb-2">SELECT LOCATION</div>
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div>
      </div>
    </div>
  );
};

export default CreateCarForm;
