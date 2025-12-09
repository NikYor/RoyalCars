import { useState, useEffect, useContext } from "react";
import CarsByCompany from "../components/CarsByCompany";
import { getAllCompanies } from "../services/companyService";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { setError, clearFeedback } from '../store/feedbackSlice';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearFeedback())
    async function fetchCompanies() {
    try {
        const res = await getAllCompanies();
        const data = res;
        setCompanies(data);
      }
      catch {
        dispatch(setError('Failed to fetch companies'))
      }
    } 
    
    fetchCompanies();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className={`p-5 pb-3 ${selectedCompany ? "catalog-scroll" : ""}`}>
        <h1 className="display-4 text-uppercase text-center mb-5">Companies</h1>
        <div className="row">
          {(selectedCompany ? 
              companies.filter(companyObj => Object.keys(companyObj)[0] === selectedCompany.name) 
              : companies
            ).map((companyObj, idx) => {
            const companyName = Object.keys(companyObj)[0];
            const carsList = companyObj[companyName];
            const cash = carsList[0].company.cash?.toFixed(2);
            const isSelected = selectedCompany?.name === companyName;

            return (
              <div className="col-md-3 mb-4" key={idx}>
                <div className={`card h-100 shadow-light rounded-lg  ${isSelected ? "rent-item active" : ""}`}>
                  <div className="card-body d-flex flex-column">
                    <h2 className="card-title">{companyName}</h2>
                    <h4 className="card-text">Cars available: {carsList.length}</h4>
                    {isAdmin && 
                    <h3 className="card-text">Total : {cash}</h3>}
                    
                    {selectedCompany && selectedCompany.name === companyName ?
                      <button 
                        className="btn btn-secondary w-50 align-self-center mt-3 border-white rounded-pill" 
                        onClick={() => setSelectedCompany(null)}
                      >
                        Close
                      </button> : 
                      <button
                        className="btn btn-primary w-50 align-self-center mt-auto rounded-pill"
                        onClick={() => setSelectedCompany({ name: companyName, cars: carsList })}
                      >
                        Show Cars
                      </button>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedCompany && (
          <CarsByCompany
            cars={selectedCompany.cars}
          />
        )}
      </div>
    </div>
  );
};

export default Companies;
