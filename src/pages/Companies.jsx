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
          const isSelected = selectedCompany?.name === companyName;

          return (
            <div className="col-md-4 mb-4" key={idx}>
              <div className={`card h-100 shadow-light rounded-lg  ${isSelected ? "rent-item active" : ""}`}>
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title">{companyName}</h2>
                  <h4 className="card-text">Cars available: {carsList.length}</h4>
                  <button
                    className="btn btn-primary mt-auto rounded-pill"
                    onClick={() => setSelectedCompany({ name: companyName, cars: carsList })}
                  >
                    Show Cars
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCompany && (
        <CarsByCompany
          companyName={selectedCompany.name}
          cars={selectedCompany.cars}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default Companies;
