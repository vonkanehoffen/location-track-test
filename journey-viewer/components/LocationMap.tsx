"use client";
import React, { useEffect } from "react";

import { GoogleMap, Polyline, useJsApiLoader } from "@react-google-maps/api";
import locations from "../test-data/norwich-1/locations-2023-09-17T13:00.json";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: locations[0].latitude,
  lng: locations[0].longitude,
};

function LocationMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY!,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const path = locations.map((location) => ({
    lat: location.latitude,
    lng: location.longitude,
  }));

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Polyline path={path} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(LocationMap);
