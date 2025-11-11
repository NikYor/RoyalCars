import { useEffect, useState } from 'react';
import { getMyCars, deleteCar } from '../services/carService';
import { useNavigate } from 'react-router-dom';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getMyCars()
      .then(data => setCars(data))
      .catch(err => setError('Failed to load cars'));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteCar(id);
      setMessage(res.message);
      setCars(prev => prev.filter(car => car._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/cars/edit/${id}`);
  };

  return (
    <div className="container py-5" style={{height: '83vh'}}>
      <h2 className="text-center mb-4">Manage Cars</h2>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
      {cars.length === 0 ? (
        <p>No cars found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
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
                <td>{car.category}</td>
                <td>{car.location}</td>
                <td>{car.price}</td>
                <td>{car.status}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(car._id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(car._id)}>
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
