import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMyCars, deleteCar } from '../services/carService';
import { setMessage, setError, clearFeedback } from '../store/feedbackSlice';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCars = async () => {
      dispatch(clearFeedback());
      try {
        const data = await getMyCars();
        setCars(data);
      } catch (err) {
        dispatch(setError('Failed to fetch cars'));
      }
    };

    fetchCars();
  }, [dispatch]);

  const handleDelete = async (id) => {
    dispatch(clearFeedback());
    try {
      const res = await deleteCar(id);
      dispatch(setMessage(res.message || 'Car deleted successfully'));
      setCars(prev => prev.filter(car => car._id !== id));
    } catch (err) {
      dispatch(setError('Failed to delete car'));
    }
  };

  const handleEdit = (id) => {
    navigate(`/cars/edit/${id}`);
  };

  return (
    <div className="container py-5" style={{ height: '83vh' }}>
      <h2 className="text-center mb-4">Manage Cars</h2>
      {cars.length === 0 ? (
        <p>No cars found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Transmition</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car._id}>
                <td>{car.name}</td>
                <td>{car.transmition}</td>
                <td>{car.location}</td>
                <td>{car.price}</td>
                <td>{car.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(car._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCars;
