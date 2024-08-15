import React, { useEffect, useState } from 'react';
import './cssFiles/Reactmap.css'
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';


export default function Reactmap({formdata}) {
  return (
    <div style={{ height: "100vh", width: "80%" }}>
      <APIProvider apiKey='AIzaSyB_bX8v9W5qD-n9FRPyO4U_sL1j4bmcZD0'>
        <Map mapId='8fe6afd65ed0a69f' fullscreenControl={false}>
          <Directions frmdata={formdata} />
        </Map>
      </APIProvider>
    
    </div>
  );
}

function Directions({frmdata}) {
  let map = useMap();
  let routesLibrary = useMapsLibrary("routes");
  let [directionsService, setDirectionsService] = useState(null);
  let [directionsRenderer, setDirectionsRenderer] = useState(null);
  let [routes, setRoutes] = useState([]);
  let [routesIndex, setRoutesIndex] = useState(0);
  let [places,setPlaces]=useState(["goa","delhi"])
  const litrePerKm = 5/100
  const litreCostKm = litrePerKm*107

  useEffect(()=>{
    if(!frmdata) return;
    setPlaces([frmdata[0],frmdata[1]]);
  },frmdata)

  useEffect(() => {
    if (!routesLibrary || !map) return;

    try {
      // Initialize DirectionsService and DirectionsRenderer
      setDirectionsService(new routesLibrary.DirectionsService());
      const renderer = new routesLibrary.DirectionsRenderer({ map });
      setDirectionsRenderer(renderer);
    } catch (error) {
      console.error("Error initializing DirectionsService or DirectionsRenderer:", error);
    }
  }, [routesLibrary, map,places,setPlaces]);


  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    try {
      directionsService.route({
        origin: places[0],
        destination: places[1],
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      }, (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setRoutes(response.routes);
          console.log(response);
          console.log(routesIndex);
          directionsRenderer.setRouteIndex(routesIndex);
          response.routes=[response.routes[routesIndex]]
          console.log(response);
          directionsRenderer.setDirections(response); // Initially show all routes
          
        } else {
          console.error("Directions request failed due to " + status);
        }
      });
    } catch (error) {
      console.error("Error during route calculation:", error);
    }
  }, [directionsService,directionsRenderer,places,routesIndex]);

  useEffect(() => {
    if (!directionsRenderer) return;

    try {

      directionsRenderer.setRouteIndex(routesIndex); // Update the selected route

    } catch (error) {
      console.error("Error updating directions renderer:", error);
    }
  }, [routesIndex, directionsRenderer]);

  let selected = routes[routesIndex];
  let leg = selected?.legs[0];

  if (!leg) return null;

  return (
    <div className='directions'>
      <h2>{selected.summary}</h2>
      <p>{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}</p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>
      <p>Cost : ₹ {Number(leg.distance?.text.split(' ')[0])*litreCostKm}</p>
     

      <h2>Other routes available</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button className='btn btn-warning' onClick={() => setRoutesIndex(index)}>{route.summary}</button>
          </li>
        ))}
      </ul>

      <div>
        <p>{frmdata[0]}</p>
      </div>
    </div>
  );
}
