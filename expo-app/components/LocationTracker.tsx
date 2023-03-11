import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { timeout } from "../lib/helpers";

export function LocationTracker() {
  const [track, setTrack] = useState(false);
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState<null | LocationObject>(null);
  const [ready, setReady] = useState(true);
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
    if (track && ready) {
      getLocation();
    }
  }, [track, ready]);

  // Makes location call, saves, then waits arbitrary time until saying ready to do it again
  const getLocation = async () => {
    setReady(false);
    const wait = Math.random() * 2000;
    console.log("wait", wait);
    const loc = await timeout(wait);
    setCount(count + 1);
    await timeout(2000);
    setReady(true);
  };

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
      <Text>ready = {ready ? "true" : "false"}</Text>
    </View>
  );
}
