const CarsByCompany = ({ companyName, cars, onClose }) => {
  return (
    <div className="mt-4">
      <h3>{companyName} Cars</h3>
      <button className="btn btn-secondary mb-3" onClick={onClose}>
        Close
      </button>
      <div className="row">
        {cars.map((car) => (
          <div className="col-md-4 mb-4" key={car._id}>
            <div className="card h-100 shadow-sm">
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
                <button className="btn btn-primary mt-auto rounded-pill">
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
