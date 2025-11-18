import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { requestAdmin } from '../services/authService';
import { setMessage, setError, clearFeedback } from '../store/feedbackSlice';

const Profile = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleRequestAdmin = async () => {
    dispatch(clearFeedback());
    try {
      const res = await requestAdmin();
      dispatch(setMessage(res.message || 'Request sent successfully'));
    } catch (err) {
      dispatch(setError(err.message || 'Failed to send request'));
    }
  };

  return (
    <div className="container py-5" style={{ height: '83vh' }}>
      <h2 className="text-center mb-4">Welcome, {user.email}</h2>

      {!isAdmin && (
        <>
          <p>You are a regular user.</p>
          <button className="btn btn-outline-secondary" onClick={handleRequestAdmin}>
            Request Admin
          </button>
        </>
      )}

      {isAdmin && (
        <>
          <p>You are an admin!</p>
          <div className="text-center mb-4 d-flex flex-wrap justify-content-center">
            <NavLink to="/cars/create" className="btn btn-outline-primary rounded-pill mr-3">
              ➕ Create New Car
            </NavLink>
            <NavLink to="/cars/manage" className="btn btn-outline-warning rounded-pill mr-3">
              ✏️ Manage Cars
            </NavLink>
            <NavLink to="/users/manage" className="btn btn-outline-info rounded-pill mr-3">
              👥 Manage Users
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
