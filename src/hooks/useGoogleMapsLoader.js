import { useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_LIBRARIES } from "../constants";

export function useGoogleMapsLoader() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvvycz7lLgGajPvMgu37mt9-OgtrC_b_c",
    libraries: GOOGLE_MAP_LIBRARIES,
  });

  return { isLoaded, loadError };
}