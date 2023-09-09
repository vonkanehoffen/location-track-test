import * as SQLite from "expo-sqlite";
import * as Location from "expo-location";
import { Platform } from "react-native";
import { useEffect, useState } from "react";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("locations.db");
  return db;
}

export const db = openDatabase();

export function setupDb() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        journeyId TEXT, 
        timestamp INTEGER, 

        accuracy REAL,
        altitude REAL,
        altitudeAccuracy REAL,
        heading REAL,
        latitude REAL,
        longitude REAL,
        speed REAL
      );`
      );
    });
  }, []);
}

export function addTrackPoint(
  journeyId: string,
  location: Location.LocationObject
) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO locations (
        journeyId, 
        timestamp, 
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        journeyId,
        location.timestamp,
        location.coords.accuracy,
        location.coords.altitude,
        location.coords.altitudeAccuracy,
        location.coords.heading,
        location.coords.latitude,
        location.coords.longitude,
        location.coords.speed,
      ]
    );
  });
}

export function getTrackPoints(journeyId: string) {
  return new Promise<Location.LocationObject[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations WHERE journeyId = ? ORDER BY timestamp ASC;`,
        [journeyId],
        (_, { rows }) => {
          console.log("getTrackPoints db", journeyId, rows._array);
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}

// export function useGetTrackPoints(journeyId: string) {
//   const [trackPoints, setTrackPoints] = useState<Location.LocationObject[]>([]);

//   useEffect(() => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `SELECT * FROM locations WHERE journeyId = ? ORDER BY timestamp ASC;`,
//         [journeyId],
//         (_, { rows }) => {
//           setTrackPoints(rows._array);
//         }
//       );
//     });
//   }, [journeyId]);

//   return trackPoints;
// }

export type JourneySummary = {
  journeyId: string;
  start: number;
  end: number;
};

export function useGetJourneys() {
  const [journeys, setJourneys] = useState<JourneySummary[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT journeyId, MIN(timestamp) as start, MAX(timestamp) as end FROM locations GROUP BY journeyId;`,
        [],
        (_, { rows }) => {
          setJourneys(rows._array);
        }
      );
    });
  }, []);

  return journeys;
}
