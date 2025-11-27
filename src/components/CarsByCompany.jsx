import { useNavigate } from "react-router-dom";

const CarsByCompany = ({ cars }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-4 mb-4" key={car._id}>
            <div className="card h-100 shadow-light rounded-lg">
              <img
                src={car.image}
                alt={car.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5>{car.name}</h5>
                <p>Transmission: {car.transmission}</p>
                <p>Mileage: {car.mileage}</p>
                <p>Price: ${car.price}</p>
                <button className="btn btn-primary mt-auto rounded-pill"
                  onClick={() => navigate(`/booking/${car._id}/${car.name}`)}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsByCompany;
