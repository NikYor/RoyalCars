import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';

import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createBooking, getBookingById } from '../services/bookingService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const dispatch = useDispatch();
  const { id, title } = useParams();
  const { userId } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await getBookingById(id, token);
      setBookings(res);
    };
    fetchBookings();
  }, [id]);

  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    fullName: ''
  });

  const disabledTimes = bookings
  .filter(b => {
    const bookingDate = b.pickupDate;
    const selectedDate = formData.pickupDate
      ? formData.pickupDate.toLocaleDateString("sv-SE")
      : "";
    return bookingDate === selectedDate;
  })
  .flatMap(b => {
    let start;
    if (typeof b.pickupTime === "string" && /^\d{2}:\d{2}$/.test(b.pickupTime)) {
      const [hours, minutes] = b.pickupTime.split(":").map(Number);
      start = new Date(formData.pickupDate || new Date());
      start.setHours(hours, minutes, 0, 0);
    } else {
      start = new Date(b.pickupTime);
    }

    const durationSeconds = parseInt(b.duration, 10) || 0;
    const end = new Date(start.getTime() + durationSeconds * 1000);

    const times = [];
    let current = new Date(start);
    while (current <= end) {
      times.push(new Date(current));
      current.setMinutes(current.getMinutes() + 1);
    }
    return times;
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, pickupDate: date }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({ ...prev, pickupTime: time }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearFeedback());

    const token = localStorage.getItem('token');
    
    if (!token || !userId) {
      alert('You must be logged in to book a car.');
      return;
    }

    const payload = {
      ...formData,
      car: id,
      user: userId,
      pickupDate: formData.pickupDate
        ? formData.pickupDate.toLocaleDateString("sv-SE")
        : "",
      pickupTime: formData.pickupTime
        ? formData.pickupTime.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })
        : "",
    };

    try {
      const res = await createBooking(payload, token);

      const data = res;
      dispatch(setMessage(data.message) || 'Booking submitted successfully!');
      navigate(`/cars/${id}`);
    } catch (err) {
      dispatch(setError(err.message) || 'Something went wrong');
    }
  };

  return (
    <div className="container-fluid py-5">
      <h2 className="text-center mb-4">Book Car - {title}</h2>
      <form onSubmit={handleSubmit} className="container g-3">
        <div className='card d-block rounded-lg pt-2 w-75 mx-auto shadow-light'>
        {[
          { name: 'pickupLocation', label: 'Pickup Location' },
          { name: 'dropLocation', label: 'Drop Location' },
          { name: 'fullName', label: 'Full Name' },
        ].map(({ name, label, type = 'text' }) => (
          <div className="col-md" key={name}>
            <span className="form-label">{label}</span>
            <input
              type={type}
              name={name}
              className="form-control rounded-lg"
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-md" style={{display: 'grid'}}>
          <span className="form-label">Pickup Date</span>
          <DatePicker
            selected={formData.pickupDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="form-control rounded-lg"
            required
          />
        </div>

        <div className="col-md mb-3" style={{display: 'grid'}}>
          <span className="form-label">Pickup Time</span>
          <DatePicker
            selected={formData.pickupTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="HH:mm"
            className="form-control rounded-lg"
            required
            excludeTimes={disabledTimes}
          />
        </div>
        <div className="col-12 text-center my-4">
          <button type="button" className="btn btn-secondary px-5 mr-5 rounded-pill" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary px-5 rounded-pill">
            Confirm Booking
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Booking;
