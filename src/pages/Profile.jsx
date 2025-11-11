import { useContext, useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { requestAdmin, getPendingRequests, approveAdmin } from '../services/authService';

const Profile = () => {
  const { user, token, isAdmin, logout } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (isAdmin) {
      getPendingRequests()
        .then(data => setRequests(data.users))
        .catch(err => setError(err.message));
    }
  }, [isAdmin]);

  const handleRequestAdmin = async () => {
    setError('');
    try {
      const res = await requestAdmin();
      setMessage(res.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const res = await approveAdmin(userId);
      setMessage(res.message);
      setRequests(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container py-5" style={{height: '83vh'}}>
        <h2 className="text-center text-danger">You are not logged in</h2>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{height: '83vh'}}>
      <h2 className="text-center mb-4">Welcome, {user.email}</h2>
      <div className="text-center">
        <p>Your token: <code>{token}</code></p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {!isAdmin && (
        <>
          <p>You are a regular user.</p>
          <button onClick={handleRequestAdmin}>Request Admin</button>
        </>
      )}
      {isAdmin && (
        <>
          <p>You are an admin!</p>
          {/* I WANT HERE BUTTON LINK TO CREATE CAR FORM  */}
          <div className="text-center mb-3">
            <NavLink to="/cars/create" className="btn btn-primary">
              Create New Car
            </NavLink>
          </div>
          <h4 className="mt-4">Pending Admin Requests</h4>
          {requests.length === 0 ? (
            <p>No pending requests</p>
          ) : (
            <table className="table table-bordered mt-2">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(user => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <button className="btn btn-success btn-sm" onClick={() => handleApprove(user._id)}>
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default Profile;
