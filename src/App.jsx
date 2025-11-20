import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './router';
import FeedbackOverlay from './components/FeedbackOverlay';
import { useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setLoaded } from "./store/mapsSlice";
import { setActionCount } from "./store/feedbackSlice";
import { useEffect } from 'react';
import { socket } from './utils/socket';
import { useLocation } from "react-router-dom";


const libraries = ["marker"];

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvvycz7lLgGajPvMgu37mt9-OgtrC_b_c",
    libraries,
  });

  useEffect(() => {
    dispatch(setLoaded(isLoaded));

    socket.on("pendingAdminCountUpdated", (data) => {      
      if (data?.countAdminRequest !== undefined) {
        dispatch(setActionCount(data.countAdminRequest));
      }
    });

    return () => {
      socket.off("pendingAdminCountUpdated");
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
