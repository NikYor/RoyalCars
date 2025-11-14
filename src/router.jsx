import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
// import NotFound from './pages/NotFound';

import ManageUsers from './components/ManageUsers';
import CreateCarForm from './components/CreateCarForm';
import EditCarForm from './components/EditCarForm';
import ManageCars from './components/ManageCars';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import AdminRoute from './components/AdminRoute';
import Unauthorized from './components/Unauthorized';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>}/>
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>}/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Home />} />
      <Route path="/cars/manage" element={<AdminRoute><ManageCars /></AdminRoute>} />
      <Route path="/users/manage" element={<AdminRoute><ManageUsers /></AdminRoute>} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/cars/create" element={<PrivateRoute><CreateCarForm /></PrivateRoute>} />
      <Route path="/cars/edit/:id" element={<PrivateRoute><EditCarForm /></PrivateRoute>} />
      <Route path="/booking/:id/:title" element={<PrivateRoute><Booking /></PrivateRoute>}/>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RouterConfig;
