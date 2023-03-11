import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export function LocationTracker() {
  const [location, setLocation] = useState<null | LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleGetLocation = async () => {
    console.log("getting location");
    const newLocation = await Location.getCurrentPositionAsync({});
    // const newLocation = await Location.getLastKnownPositionAsync({});
    console.log("got it", location);
    setLocation(newLocation);
  };

  return (
    <View>
      <Button title="Get Location" onPress={handleGetLocation} />
      <Text>
        Lat: {location?.coords.latitude} / Lon: {location?.coords.longitude}
      </Text>
    </View>
  );
}
