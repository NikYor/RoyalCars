import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FormInput from './components/FormInput';
// import NotFound from './pages/NotFound';

import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cars/:id" element={<CarDetail />} />
      <Route path="/cars/create" element={<PrivateRoute><FormInput /></PrivateRoute>} />
      <Route path="/booking/:id" element={<PrivateRoute><Booking /></PrivateRoute>}/>
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>}/>
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>}/>
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default RouterConfig;
