import { useState, useEffect, useContext } from "react";
import { getSurveys } from "../services/bookingService";
import { AuthContext } from "../context/AuthContext";
import { getCarById } from "../services/carService";
import { getUserById } from "../services/authService";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [mappedSurveys, setMappedSurveys] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getSurveysList() {
      try {
        const res = await getSurveys(token); // [{ car, text, rating }]
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
              console.error("Error loading car name:", err);
              return {
                ...survey,
                carName: "Unknown Car",
              };
            }
          })
        );

        setMappedSurveys(enriched);
      } catch (err) {
        console.error("Error loading surveys:", err);
      }
    }

    getSurveysList();
  }, []);

  return (
    <div className="container p-5">
      <h1 className="text-center mb-4">Surveys</h1>
      <ul className="col-md-4">
        {mappedSurveys.map((survey) => (
          <li key={survey._id} className="card h-100 shadow-light rounded-lg px-2">
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SurveyList;