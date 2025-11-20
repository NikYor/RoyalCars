import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NotificationBanner from '../widgets/NotificationBanner';

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  const location = useLocation();

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

              {isAdmin ? (
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Cars</a>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/catalog" className="dropdown-item">Catalog</NavLink>
                  <NavLink to="/bookings" className="dropdown-item">Bookings</NavLink>
                </div>
              </div>
              ): (
                  <NavLink to="/catalog" className="nav-item nav-link">Catalog</NavLink>
              )}

              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink to="/companies" className="dropdown-item">Companies</NavLink>
                  <NavLink to="/testimonials" className="dropdown-item">Testimonial</NavLink>
                </div>
              </div>
              
              <NavLink to="/about" className="nav-item nav-link">About</NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink to="/profile" className="nav-item nav-link">Profile
                    {location.pathname != '/profile' && location.pathname != '/users/manage'&& 
                    <NotificationBanner/>
                    }
                  </NavLink>
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
