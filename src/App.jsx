import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RouterConfig from './router';
import FeedbackOverlay from './components/FeedbackOverlay';
import { useJsApiLoader } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setLoaded } from "./store/mapsSlice";
import { useEffect } from 'react';

const libraries = ["marker"];

function App() {
  const dispatch = useDispatch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvvycz7lLgGajPvMgu37mt9-OgtrC_b_c",
    libraries,
  });

  useEffect(() => {
    dispatch(setLoaded(isLoaded));
  }, [isLoaded, dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <main className="container-fluid px-0" >
          <FeedbackOverlay />
          <RouterConfig />
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
