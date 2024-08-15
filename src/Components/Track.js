import React, { useEffect, useRef } from "react";

const Track = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      initMap();
    } else {
      window.initMap = initMap;
    }

    function initMap() {
      console.log("Initializing map...");
      const initialPosition = { lat: 51.505, lng: -0.09 };
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: initialPosition,
      });

      mapInstanceRef.current = mapInstance;

      // Start watching position immediately after the map is initialized
      startTrackingPosition();
    }
  }, []);

  const startTrackingPosition = () => {
    if (mapInstanceRef.current) {
      console.log("Starting to watch position...");
      const watchId = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });

      return () => navigator.geolocation.clearWatch(watchId);
    }
  };

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    console.log(lat,lng);
    const accuracy = pos.coords.accuracy;

    const map = mapInstanceRef.current;
    if (!map) {
      console.warn("Map is not initialized yet.");
      return;
    }

    const position = { lat, lng };

    // Remove the existing marker and circle if they exist
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    // Create and add the new marker and circle
    markerRef.current = new window.google.maps.Marker({
      position,
      map,
      title: "Your Location",
    });

    circleRef.current = new window.google.maps.Circle({
      center: position,
      radius: accuracy,
      map,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    });

    map.setCenter(position);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 1) {
      alert("Please allow geolocation access");
    } else if (err.code === 2) {
      console.warn("Position unavailable. Retrying...");
    } else if (err.code === 3) {
      console.warn("Geolocation timeout expired. Retrying...");
    } else {
      alert("Cannot get current location");
    }
  };

  return <div ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Track;
