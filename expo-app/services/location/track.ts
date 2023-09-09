import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import {
  addLocation,
  getJourneyId,
  getLocations,
  setJourneyId,
} from "./storage";
import { sendLocation } from "./server-state";
import { addTrackPoint } from "./db";

/**
 * The unique name of the background location task.
 */
export const locationTaskName = "office-marathon";

/**
 * Check if the background location is started and running.
 * This is a wrapper around `Location.hasStartedLocationUpdatesAsync` with the task name prefilled.
 */
export async function isTracking(): Promise<boolean> {
  return await Location.hasStartedLocationUpdatesAsync(locationTaskName);
}

/**
 * Start the background location monitoring and add new locations to the storage.
 * This is a wrapper around `Location.startLocationUpdatesAsync` with the task name prefilled.
 */
export async function startTracking(journeyId: string) {
  setJourneyId(journeyId);
  await Location.startLocationUpdatesAsync(locationTaskName, {
    accuracy: Location.Accuracy.BestForNavigation,
    timeInterval: 15 * 1000,
    // android behavior
    foregroundService: {
      notificationTitle: "Location track test active",
      notificationBody: "Monitoring your location to measure total distance",
      notificationColor: "#333333",
    },
    // ios behavior
    activityType: Location.ActivityType.Fitness,
    showsBackgroundLocationIndicator: true,
  });
  console.log("[tracking]", "started background location task ere");
}

/**
 * Stop the background location monitoring.
 * This is a wrapper around `Location.stopLocationUpdatesAsync` with the task name prefilled.
 */
export async function stopTracking() {
  await Location.stopLocationUpdatesAsync(locationTaskName);
  console.log("[tracking]", "stopped background location task");
}

/**
 * Define the background task that's adding locations to the storage.
 * This method isn't "directly" connected to React, that's why we store the data locally.
 */
TaskManager.defineTask(locationTaskName, async (event) => {
  if (event.error) {
    return console.error(
      "[tracking]",
      "Something went wrong within the background location task...",
      event.error
    );
  }

  const locations = (event.data as any).locations as Location.LocationObject[];
  console.log("[tracking]", "Received new locations", locations);

  try {
    // const lastStoredLocation = (await getLocations()).slice(-1)[0];
    // have to add it sequentially, parses/serializes existing JSON

    // is array always in sequence? out of sequence could explain weird jumps
    const journeyId = await getJourneyId();
    if (journeyId) {
      for (const location of locations) {
        // await addLocation(location);
        // await sendLocation(location);
        addTrackPoint(journeyId, location);
      }
    }
  } catch (error) {
    console.log(
      "[tracking]",
      "Something went wrong when saving a new location...",
      error
    );
  }
});
