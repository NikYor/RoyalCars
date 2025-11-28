import { NavLink } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { requestAdmin } from "../services/authService";
import { setMessage, setError, clearFeedback } from "../store/feedbackSlice";
import NotificationAdmin from '../components/NotificationAdmin';
import NotificationSurvey from '../components/NotificationSurvey';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [company, setCompany] = useState("");
  const { cars } = useSelector((state) => state.completed)
  const { actionCount } = useSelector(state => state.feedback);

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
      <h1 className="display-4 text-uppercase text-center mb-5">Welcome, {user.email}</h1>

      {!isAdmin && (
        <>
          <p>You are a regular user.</p>
          <div className="text-center mb-4 d-flex flex-wrap justify-content-center">
          <button
            className="btn btn-outline-warning mr-3 bg-white rounded-pill"
            onClick={() => setShowModal(true)}
          >
            🛡️ Request Admin Role
          </button>
           {cars.length > 0 && 
              <NavLink
                to="/survey/create"
                className="btn btn-outline-success rounded-pill bg-white mr-3 position-relative"
              >
                📝 Take Survey
                <NotificationSurvey />
              </NavLink>
          }
          </div>

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
          <div className="text-center mb-4 d-flex flex-wrap justify-content-center">
            <NavLink to="/cars/create" className="btn btn-outline-primary bg-white rounded-pill mr-3">
              ➕ Create New Car
            </NavLink>
            <NavLink to="/cars/manage" className="btn btn-outline-warning bg-white rounded-pill mr-3">
              ✏️ Manage Cars
            </NavLink>
            <NavLink to="/users/manage" className="btn btn-outline-info bg-white rounded-pill mr-3 position-relative">
              👥 Manage Users
              {actionCount > 0 && <NotificationAdmin />}
            </NavLink>
            {cars.length > 0 && <NavLink
              to="/survey/create"
              className="btn btn-outline-success bg-white rounded-pill mr-3 position-relative"
            >
              📝 Take Survey
              <NotificationSurvey />
            </NavLink>}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
