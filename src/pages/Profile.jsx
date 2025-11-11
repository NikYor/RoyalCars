import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { requestAdmin } from '../services/authService';

const Profile = () => {
  const { user, isAdmin } = useContext(AuthContext);

  const handleRequestAdmin = async () => {
    setError('');
    try {
      const res = await requestAdmin();
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="container py-5" style={{ height: '83vh' }}>
      <h2 className="text-center mb-4">Welcome, {user.email}</h2>

      {!isAdmin && (
        <>
          <p>You are a regular user.</p>
          <button onClick={handleRequestAdmin}>Request Admin</button>
        </>
      )}

      {isAdmin && (
        <>
          <p>You are an admin!</p>
          <div className="text-center mb-4 d-flex flex-wrap justify-content-center gap-3">
            <NavLink to="/cars/create" className="btn btn-outline-primary mr-2">
              ➕ Create New Car
            </NavLink>
            <NavLink to="/cars/manage" className="btn btn-outline-warning mr-2">
              ✏️ Manage Cars
            </NavLink>
            <NavLink to="/users/manage" className="btn btn-outline-info">
              👥 Manage Users
            </NavLink>
          </div>

        </>
      )}
    </div>
  );
};

export default Profile;
