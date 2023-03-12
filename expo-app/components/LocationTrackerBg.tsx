import React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

// See https://docs.expo.dev/versions/v48.0.0/sdk/task-manager/#example

// No no no.
// https://developer.android.com/training/location/permissions
// The system considers your app to be using foreground location if a feature of your app accesses the device's current location in one of the following situations:
//
// An activity that belongs to your app is visible.
// Your app is running a foreground service. When a foreground service is running, the system raises user awareness by showing a persistent notification.

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    console.log("fg location granted");
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      console.log("bg location granted");
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

export function LocationTrackerBg() {
  return (
    <View style={styles.container}>
      <Button onPress={requestPermissions} title="Enable background location" />
    </View>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log("bg location error", error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
    console.log("bg location", locations);
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
