import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { getPendingRequests, approveAdmin } from '../services/authService';
import { setError, setMessage, clearFeedback } from '../store/feedbackSlice';

const ManageUsers = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRequests = async () => {
      dispatch(clearFeedback());
      try {
        if (isAdmin) {
          const data = await getPendingRequests();
          setRequests(data.users);
        }
      } catch (err) {
        dispatch(setError(err.message || 'Failed to load pending requests'));
      }
    };

    fetchRequests();
  }, [isAdmin, dispatch]);

  const handleApprove = async (userId) => {
    dispatch(clearFeedback());
    try {
      const res = await approveAdmin(userId);
      dispatch(setMessage(res.message || 'User approved successfully'));
      setRequests(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      dispatch(setError(err.message || 'Approval failed'));
    }
  };

  if (!user) {
    return (
      <div className="container py-5">
        <h2 className="text-center text-danger">You are not logged in</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
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
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
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

export default ManageUsers;
