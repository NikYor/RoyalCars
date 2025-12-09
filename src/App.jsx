import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './router';
import FeedbackOverlay from './components/FeedbackOverlay';
import { useDispatch } from "react-redux";
import { setLoaded } from "./store/mapsSlice";
import { setActionCount } from "./store/feedbackSlice";
import { useEffect } from 'react';
import { socket } from './utils/socket';
import { useLocation } from "react-router-dom";
import { addCompletedCar } from "./store/completedSlice";
import { useGoogleMapsLoader } from './hooks/useGoogleMapsLoader';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoaded } = useGoogleMapsLoader()
  
  useEffect(() => {
    dispatch(setLoaded(isLoaded));

    socket.on("pendingAdminCountUpdated", (data) => {      
      if (data?.countAdminRequest !== undefined) {
        dispatch(setActionCount(data.countAdminRequest));
      }
    });

    socket.on("carSurvey", (data) => {
      if (data.carId) {
        dispatch(addCompletedCar({[data.carId]: new Date().toLocaleString('ro-RO')}));
      }
    })

    return () => {
      socket.off("pendingAdminCountUpdated");
      socket.off("carSurvey");
    };
  }, [isLoaded, dispatch]);

  return (
    <>
      <Navbar />
      <main className="container-fluid px-0" style={location.pathname === '/about' ? {backgroundImage: 'none'}: {}}>
        <FeedbackOverlay />
        <RouterConfig />
      </main>
      <Footer />
    </>
  );
}

export default App;
