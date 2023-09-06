import _ from "lodash";
import { _calculateGreatCircleDistance } from "./locationHelpers";

// See https://snack.expo.dev/@arrygoo/locations-blogpost

type Location = {
  timestamp: Date;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  heading: number;
  speed: number;
  accuracyDifference: number;
  validation: string;
};

export const kalman = (
  location: Location,
  lastLocation: Location,
  constant: number
) => {
  const accuracy = Math.max(location.accuracy, 1);
  const result = { ...location, ...lastLocation };

  if (!lastLocation) {
    result.variance = accuracy * accuracy;
  } else {
    const timestampInc =
      location.timestamp.getTime() - lastLocation.timestamp.getTime();

    if (timestampInc > 0) {
      // We can tune the velocity and particularly the coefficient at the end
      const velocity =
        (_calculateGreatCircleDistance(location, lastLocation) / timestampInc) *
        constant;
      result.variance += (timestampInc * velocity * velocity) / 1000;
    }

    const k = result.variance / (result.variance + accuracy * accuracy);
    result.latitude += k * (location.latitude - lastLocation.latitude);
    result.longitude += k * (location.longitude - lastLocation.longitude);
    result.variance = (1 - k) * result.variance;
  }

  return {
    ...location,
    ..._.pick(result, ["latitude", "longitude", "variance"]),
  };
};

// This was just for demo on already collected data?
let lastLocation;
export const runKalmanOnLocations = (rawData, kalmanConstant) =>
  rawData
    .map((location) => ({
      ...location,
      timestamp: new Date(location.timestamp),
    }))
    .map((location) => {
      lastLocation = kalman(location, lastLocation, kalmanConstant);
      return lastLocation;
    });
