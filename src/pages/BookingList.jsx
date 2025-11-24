import React, { useEffect, useState } from "react";
import { bookingList } from "../services/bookingService";
import BookCard from "../components/BookCard";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await bookingList(token);
      setBookings(data);
    };
    fetchBookings();
  }, [token]);

  return (
    <div className="container-fluid py-5 px-0">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">Booking List</h1>
        <div className="row">
          {bookings.map((b, index) => (
            <BookCard
              key={index}
              title={b.car.name}
              count={b.count}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingList;

