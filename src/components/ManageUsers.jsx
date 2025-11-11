import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPendingRequests, approveAdmin } from '../services/authService';

const ManageUsers = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      getPendingRequests()
        .then(data => setRequests(data.users))
        .catch(err => setError(err.message));
    }
  }, [isAdmin]);

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
      <div className="container py-5" style={{ height: '83vh' }}>
        <h2 className="text-center text-danger">You are not logged in</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5" style={{ height: '83vh' }}>
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
      </div>

      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
    </>
  )
}

export default ManageUsers;