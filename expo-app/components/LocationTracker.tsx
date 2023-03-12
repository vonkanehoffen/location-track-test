import React, { useEffect, useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { timeout } from "../lib/helpers";
import { graphql } from "../lib/gql";
import { useMutation } from "urql";

const InsertLocation = graphql(`
  mutation InsertLocation($l: journey_location_insert_input!) {
    insert_journey_location(objects: [$l]) {
      affected_rows
      returning {
        id
        journey_id
        location
        timestamp
      }
    }
  }
`);

// TODO: LOCATION_FOREGROUND permission is required to do this operation. - intermittent

export function LocationTracker() {
  const [track, setTrack] = useState(false);
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState<null | LocationObject>(null);
  const [ready, setReady] = useState(true);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [insertLocationResult, insertLocation] = useMutation(InsertLocation);

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
    try {
      const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
      const result = insertLocation({
        l: {
          journey_id: "1",
          location: `${newLocation.coords.latitude}, ${newLocation.coords.longitude}`,
        },
      });
      console.log("result ", result);
      setCount(count + 1);
    } catch (e) {
      console.log("Silent location fail", e);
    }
    await timeout(2000);
    setReady(true);
  };

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
      <Text>
        Mutation result{" "}
        {JSON.stringify(
          insertLocationResult.data?.insert_journey_location?.returning,
          null,
          2
        )}
      </Text>
    </View>
  );
}
