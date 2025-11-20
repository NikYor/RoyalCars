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

          return (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{companyName}</h5>
                  <p className="card-text">Cars available: {carsList.length}</p>
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

      {/* условно рендериране на CarsByCompany */}
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
