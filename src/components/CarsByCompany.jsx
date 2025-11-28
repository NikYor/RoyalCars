import { useNavigate } from "react-router-dom";

const CarsByCompany = ({ cars }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 p-0">
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-3 mb-4" key={car._id}>
            <div className="card h-100 shadow-light rounded-lg">
              <img
                src={car.image}
                alt={car.name}
                style={{ height: "200px", objectFit: "scale-down", margin: "10px"}}
              />
              <div className="card-body text-center d-flex flex-column">
                <h5>{car.name}</h5>
                <span>Transmission: {car.transmission}</span>
                <span>Mileage: {car.mileage}</span>
                <span>Price: ${car.price}</span>
                <button className="btn btn-primary mt-4 w-50 align-self-center rounded-pill"
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
