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
  const [accuracyCull, setAccuracyCull] = React.useState(1000);
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

  console.log("culling", accuracyCull);
  const path = locations
    .filter((location) => location.accuracy < accuracyCull)
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((location) => ({
      lat: location.latitude,
      lng: location.longitude,
      accuracy: location.accuracy,
      timestamp: location.timestamp,
    }));

  const accuracies = path.map((location) => location.accuracy);
  const minAccuracy = accuracies.reduce((a, b) => Math.min(a, b));
  const maxAccuracy = accuracies.reduce((a, b) => Math.max(a, b));

  console.log(path.length, minAccuracy, maxAccuracy);

  const getStrokeColor = (location: any) => {
    const v =
      ((location.accuracy - minAccuracy) / (maxAccuracy - minAccuracy)) * 255;
    return `rgb(${v}, ${v}, ${v})`;
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {path.map((e, i) => (
          <Polyline
            key={e.timestamp}
            path={[e, path[i + 1]]}
            options={{
              strokeColor: getStrokeColor(e),
            }}
          />
        ))}
      </GoogleMap>
      <div className="absolute top-20 left-10 p-2 bg-white">
        <pre className="mr-2">Accuracy cull</pre>
        <input
          type="text"
          value={accuracyCull}
          onChange={(e) => setAccuracyCull(+e.target.value)}
        />
      </div>
    </>
  ) : (
    <></>
  );
}

export default LocationMap;
