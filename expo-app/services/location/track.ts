import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import { getJourneyId, setJourneyId } from "./storage";
import {
  addJourneyLocation,
  addJourneyRawLocation,
  getLastJourneyLocation,
} from "./db";
import { KalmanLocation, kalman } from "./kalman";

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
    // is array always in sequence? out of sequence could explain weird jumps
    const journeyId = await getJourneyId();

    if (journeyId) {
      let lastLocation = await getLastJourneyLocation(journeyId);

      // Save raw location data for debug / testing
      for (const location of locations) {
        addJourneyRawLocation(journeyId, location);
      }
      const kalmanLocations = locations.map((location) => {
        const loc: KalmanLocation = {
          timestamp: location.timestamp,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy || 1,
          variance: 0,
        };
        // first rec = 500
        // 2nd rec = 2000
        // 3rd rec = 100
        lastLocation = kalman(loc, lastLocation, 500);
        return lastLocation;
      });
      for (const location of kalmanLocations) {
        // TODO: SignalR for server state?
        // await sendLocation(location);

        // TODO: Store raw location data as well. Plot along with Kalman + some way to replay / save out?
        // Also look at bg location lib maybe?

        addJourneyLocation(journeyId, location);
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
