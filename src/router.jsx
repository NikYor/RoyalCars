import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import About from './pages/About';
import BookingList from './pages/BookingList';
import Booking from './pages/Booking';
import Unauthorized from './pages/Unauthorized';
import ManageUsers from './pages/ManageUsers';
import ManageCars from './pages/ManageCars';
import Companies from './pages/Companies';
import EditCarForm from './pages/EditCarForm';
import CreateCarForm from './pages/CreateCarForm';
import Survey from './pages/Survey';
import SurveyList from './pages/SurveyList';

import PrivateRoute from './guards/PrivateRoute';
import GuestRoute from './guards/GuestRoute';
import AdminRoute from './guards/AdminRoute';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/bookings" element={<AdminRoute><BookingList /></AdminRoute>}/>
      <Route path="/booking/:id/:title" element={<PrivateRoute><Booking /></PrivateRoute>}/>
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>}/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>}/>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/survey/create" element={<Survey />} />
      <Route path="/survey/list" element={<SurveyList />} />

      <Route path="/cars/manage" element={<AdminRoute><ManageCars /></AdminRoute>} />
      <Route path="/users/manage" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      <Route path="/cars/create" element={<PrivateRoute><CreateCarForm /></PrivateRoute>} />
      <Route path="/cars/edit/:id" element={<PrivateRoute><EditCarForm /></PrivateRoute>} />
    </Routes>
  );
};

export default RouterConfig;
