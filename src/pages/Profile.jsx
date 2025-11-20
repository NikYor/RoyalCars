import { NavLink } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { requestAdmin } from "../services/authService";
import { setMessage, setError, clearFeedback } from "../store/feedbackSlice";
import NotificationBanner from '../widgets/NotificationBanner';

const Profile = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState("");

  const handleSubmit = async () => {
    dispatch(clearFeedback());
    try {
      const res = await requestAdmin(company);
      dispatch(setMessage(res.message || "Request sent successfully"));
      setShowModal(false);
    } catch (err) {
      dispatch(setError(err.message || "Failed to send request"));
    }
  };

  return (
    <div className="container py-5" style={{ height: "83vh" }}>
      <h2 className="text-center mb-4">Welcome, {user.email}</h2>

      {!isAdmin && (
        <>
          <p>You are a regular user.</p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowModal(true)}
          >
            Request Admin
          </button>

          {showModal && (
            <div
              className="modal fade show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Enter Company</h5>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <>
          <p>You are an admin!</p>
          {/* admin actions */}
          <div className="text-center mb-4 d-flex flex-wrap justify-content-center">
            <NavLink to="/cars/create" className="btn btn-outline-primary rounded-pill mr-3">
              ➕ Create New Car
            </NavLink>
            <NavLink to="/cars/manage" className="btn btn-outline-warning rounded-pill mr-3">
              ✏️ Manage Cars
            </NavLink>
            <NavLink to="/users/manage" className="btn btn-outline-info rounded-pill mr-3">
              👥 Manage Users
              <NotificationBanner/>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
