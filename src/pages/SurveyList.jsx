import { useState, useEffect, useContext } from "react";
import { getSurveys } from "../services/bookingService";
import { AuthContext } from "../context/AuthContext";
import { getCarById } from "../services/carService";
import { getUserById } from "../services/authService";
import { setError, clearFeedback } from '../store/feedbackSlice';
import { useDispatch } from 'react-redux';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useDispatch()
  const [mappedSurveys, setMappedSurveys] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getSurveysList() {
      dispatch(clearFeedback())
      try {
        const res = await getSurveys(token);
        setSurveys(res);

        const enriched = await Promise.all(
          res.map(async (survey) => {
            try {
              const car = await getCarById(survey.car);
              const user = await getUserById(survey.userId);

              return {
                ...survey,
                carName: car.name,
                userEmail: user.email,
              };
            } catch (err) {
              dispatch(setError("Error loading car name:", err));
              return {
                ...survey,
                carName: "Unknown Car",
              };
            }
          })
        );

        setMappedSurveys(enriched);
      } catch {
        dispatch(setError("Error loading surveys"));
      }
    }

    getSurveysList();
  }, [token]);

  return (
    <div className="container-fluid p-5">
      <h1 className="display-4 text-uppercase text-center mb-5">Surveys</h1>
      <div className="row">
        {mappedSurveys.map((survey, idx) => (
          <div key={survey._id} className="col-md-4 mb-4">
            <div className={`card h-100 shadow-light rounded-lg p-3`}>
            <h2>{survey.carName}</h2>
            <div className="mb-2 text-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < survey.rating ? "gold" : "#ccc",
                    fontSize: "1.5rem",
                    marginRight: "2px"
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p>{survey.text}</p>
            <h4 className="align-self-end">{survey.userEmail}</h4>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default SurveyList;