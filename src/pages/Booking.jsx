import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Booking = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    fullName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // TODO: Send booking to backend
    alert('Booking simulated successfully!');
  };

  return (
    <div className="container-fluid py-5 mt-5 mb-5">
      <h2 className="text-center mb-4">Book Car #{id}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            className="form-control"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Drop Location</label>
          <input
            type="text"
            name="dropLocation"
            className="form-control"
            value={formData.dropLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Pickup Date</label>
          <input
            type="date"
            name="pickupDate"
            className="form-control"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Pickup Time</label>
          <input
            type="time"
            name="pickupTime"
            className="form-control"
            value={formData.pickupTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
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
