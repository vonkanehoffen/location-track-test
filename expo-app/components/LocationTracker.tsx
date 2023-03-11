import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { timeout } from "../lib/helpers";

export function LocationTracker() {
  const [track, setTrack] = useState(false);
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState<null | LocationObject>(null);
  const [fetching, setFetching] = useState(false);
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

  useEffect(() => {
    console.log("called");
    if (track && !fetching) {
      (async () => {
        setFetching(true);
        const wait = Math.random() * 2000;
        console.log("wait", wait);
        const loc = await timeout(wait);
        setCount(count + 1);
        setFetching(false);
      })();
    }
  }, [track, fetching]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (track) setCount(count + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });

  // const getLocation = async (start: boolean) => {
  //   console.log("getLocation", { start, track });
  //   if (start || track) {
  //     console.log("track true");
  //     const newLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(newLocation);
  //     setCount(count + 1);
  //     setTimeout(getLocation, 2000);
  //   }
  // };

  // const toggleTracking = async () => {
  //   if (track) {
  //     setTrack(false);
  //   } else {
  //     setTrack(true);
  //     getLocation(true);
  //   }
  // };

  return (
    <View>
      <Button
        title={`${track ? "Stop" : "Start"} Tracking`}
        onPress={() => setTrack(!track)}
      />
      <Text>
        Lat: {location?.coords.latitude} / Lon: {location?.coords.longitude}
      </Text>
      <Text>Count = {count}</Text>
      <Text>fetchingLocation = {fetching}</Text>
    </View>
  );
}
