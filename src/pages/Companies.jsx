import { useState, useEffect } from "react";
import CarsByCompany from "../components/CarsByCompany";
import { getAllCompanies } from "../services/companyService";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    async function fetchCompanies() {
      const res = await getAllCompanies();
      const data = res;
      setCompanies(data);
    }
    fetchCompanies();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Companies</h2>
      <div className="row">
        {companies.map((companyObj, idx) => {
          const companyName = Object.keys(companyObj)[0];
          const carsList = companyObj[companyName];
          const cash = carsList[0].company.cash?.toFixed(2);
          const isSelected = selectedCompany?.name === companyName;

          return (
            <div className="col-md-4 mb-4" key={idx}>
              <div className={`card h-100 shadow-light rounded-lg  ${isSelected ? "rent-item active" : ""}`}>
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title">{companyName}</h2>
                  <h4 className="card-text">Cars available: {carsList.length}</h4>
                  <h3 className="card-text">Total : {cash}</h3>
                  <button
                    className="btn btn-primary mt-auto rounded-pill"
                    onClick={() => setSelectedCompany({ name: companyName, cars: carsList })}
                  >
                    Show Cars
                  </button>
                  {selectedCompany && selectedCompany.name === companyName? 
                  <button className="btn btn-secondary mt-3 border-white rounded-pill" onClick={() => setSelectedCompany(null)}>
                    Close
                  </button> : null}
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
  );
};

export default Companies;
