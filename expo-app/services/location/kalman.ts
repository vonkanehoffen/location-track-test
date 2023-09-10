import _ from "lodash"; // 4.17.5
import { _calculateGreatCircleDistance } from "./locationHelpers";
import { LocationObject } from "expo-location";

// https://snack.expo.dev/@arrygoo/locations-blogpost
/* In snack was...
* {
   timestamp: '2017-09-19T14:30:14.065Z',
   latitude: 43.6389325,
   longitude: -79.3866898,
   accuracy: 20,
   altitude: -1,
   validation: 'valid',
   heading: -1,
   speed: -1,
   accuracyDifference: 580
 },
*/

export type KalmanLocation = {
  timestamp: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  variance: number;
};

// constant default = 500, min=0 max=2000 ?

export const kalman = (
  location: KalmanLocation,
  lastLocation: KalmanLocation | undefined,
  constant: number
) => {
  // console.log("kalman", location, lastLocation, constant);
  const accuracy = Math.max(location.accuracy, 1);
  const result = { ...location, ...lastLocation };

  if (!lastLocation) {
    result.variance = accuracy * accuracy;
  } else {
    const timestampInc = location.timestamp - lastLocation.timestamp;

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

let lastLocation: KalmanLocation;
const runKalmanOnLocations = (
  rawData: KalmanLocation[],
  kalmanConstant: number
) =>
  rawData.map((location) => {
    lastLocation = kalman(location, lastLocation, kalmanConstant);
    return lastLocation;
  });

// export default runKalmanOnLocations;
