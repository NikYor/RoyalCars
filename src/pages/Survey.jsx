import { useSelector, useDispatch } from "react-redux";
import NotificationSurvey from "../components/NotificationSurvey";
import { getCarById } from "../services/carService";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import { saveSurvey } from "../services/bookingService";
import { clearCompletedCars } from "../store/completedSlice";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.completed);
  const [mappedCars, setMappedCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    text: ''
  });
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNames() {
      const results = [];
      for (const car of cars) {
        const carId = Object.keys(car)[0];
        const car1 = await getCarById(carId);
        const date = car[carId];
        results.push({ id: carId, name: car1.name, date });
      }
      setMappedCars(results);
    }

    if (cars && cars.length > 0) {
      loadNames();
    } else {
      setMappedCars([]);
    }
  }, [cars]);

  const handleFillSurvey = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOk = async () => {
    const payload = {
      ...formData,
      car: selectedCar.id,
      userId: userId
    }
    
    try {
      const res = await saveSurvey(payload);
      console.log(res);
    } catch (error) {
      
    }
    console.log("Survey submitted for car:", selectedCar);
    setShowModal(false);
    setSelectedCar(null);
    dispatch(clearCompletedCars(selectedCar.id));
    navigate('/profile');
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedCar(null);
  };

  return (
    <div>
      <h2>Completed Routes Survey</h2>
      {cars.length === 0 ? (
        <p>No Routes completed yet.</p>
      ) : (
        <ul>
          {mappedCars.map((car, index) => (
            <li key={index}>
              <div className="w-100 d-flex">
                <div className="col-5 mb-4 mt-2">
                  Car Name: {car.name} — Completed on {car.date}
                </div>
                <div className="col-5 mb-4">
                  <button
                    className="btn btn-sm btn-primary rounded-pill position-relative"
                    onClick={() => handleFillSurvey(car)}
                  >
                    Fill Survey
                    <NotificationSurvey />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && selectedCar && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-lg">
              <div className="modal-header">
                <h5 className="modal-title">
                  Survey for {selectedCar.name}
                </h5>
              </div>
              <div className="modal-body">
                <p>Fill out survey for car {selectedCar.name} (Date: {selectedCar.date})</p>
                <textarea
                  className="form-control"
                  placeholder="Your feedback..."
                  rows="4"
                  name='text'
                  maxLength={300}
                  onChange={handleChange}
                ></textarea>
                <div className="mb-3">
                  <label className="form-label d-block">Rating:</label>
                  <div className="d-flex justify-content-between px-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          value={value}
                          id={`rating-${value}`}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`rating-${value}`}>
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleOk}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Survey;
