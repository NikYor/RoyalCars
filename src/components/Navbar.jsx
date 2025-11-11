import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="container-fluid position-relative nav-bar p-0">
      <div className="position-relative" style={{ zIndex: 9 }}>
        <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
          <Link to="/" className="navbar-brand">
            <h1 className="text-uppercase text-primary mb-1">Royal Cars</h1>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
            <div className="navbar-nav ml-auto py-0">
              <NavLink to="/" className="nav-item nav-link">Home</NavLink>
              <NavLink to="/about" className="nav-item nav-link">About</NavLink>

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Cars</a>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/catalog" className="dropdown-item">Car Listing</NavLink>
                  <NavLink to="/cars/1" className="dropdown-item">Car Detail</NavLink>
                  <NavLink to="/booking/1" className="dropdown-item">Car Booking</NavLink>
                </div>
              </div>

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/team" className="dropdown-item">The Team</NavLink>
                  <NavLink to="/testimonials" className="dropdown-item">Testimonial</NavLink>
                </div>
              </div>
              
              <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="nav-item nav-link">Profile</NavLink>
                  <button className="btn tn-sm tn-outline-light ml-2 text-white" onClick={logout}>LOGOUT</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="nav-item nav-link">LOGIN</NavLink>
                  <NavLink to="/register" className="nav-item nav-link">Register</NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
