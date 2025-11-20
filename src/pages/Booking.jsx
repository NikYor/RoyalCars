import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createBooking } from '../services/bookingService';

const Booking = () => {
  const { id, title } = useParams();
  const { userId } = useContext(AuthContext);
  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    fullName: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    
    if (!token || !userId) {
      alert('You must be logged in to book a car.');
      return;
    }

    const payload = {
      ...formData,
      car: id,
      user: userId,
    };

    try {
      const res = await createBooking(payload, token);

      const data = res;
      alert(data.message || 'Booking submitted successfully!');
      navigate('/catalog');
    } catch (err) {
      alert(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="container-fluid py-5">
      <h2 className="text-center mb-4">Book Car - {title}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {[
          { name: 'pickupLocation', label: 'Pickup Location' },
          { name: 'dropLocation', label: 'Drop Location' },
          { name: 'pickupDate', label: 'Pickup Date', type: 'date' },
          { name: 'pickupTime', label: 'Pickup Time', type: 'time' },
          { name: 'fullName', label: 'Full Name' },
        ].map(({ name, label, type = 'text' }) => (
          <div className="col-md-6" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              className="form-control"
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12 text-center mt-4">
          <button type="submit" className="btn btn-primary px-5">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
