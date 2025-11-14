import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CarCard = ({ id, image, title, year, transmission, mileage, price }) => {
  const { user } = useContext(AuthContext);
  const isLogged = !!user

  return (
    <div className="col-lg-4 col-md-6 mb-2">
      <div className="rent-item mb-4">
        <img className="img-fluid mb-4" src={image} alt={title} />
        <h4 className="text-uppercase mb-4">{title}</h4>
        <div className="d-flex justify-content-center mb-4">
          <div className="px-2">
            <i className="fa fa-car text-primary mr-1"></i>
            <span>{year}</span>
          </div>
          <div className="px-2 border-left border-right">
            <i className="fa fa-cogs text-primary mr-1"></i>
            <span>{transmission}</span>
          </div>
          <div className="px-2">
            <i className="fa fa-road text-primary mr-1"></i>
            <span>{mileage}</span>
          </div>
        </div>
        {isLogged && <Link to={`/booking/${id}/${title}`} className="btn btn-primary px-3">
          ${price}/Day – Book Now
        </Link>}
      </div>
    </div>
  );
};

export default CarCard;
