import * as SQLite from "expo-sqlite";
import * as Location from "expo-location";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { KalmanLocation } from "./kalman";

export const DB_NAME = "locations.db";
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

  const db = SQLite.openDatabase(DB_NAME);
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
          latitude REAL,
          longitude REAL,
          accuracy REAL,
          variance REAL
        );`
      );
    });
  }, []);
}

// Drop locations table promise
export function dropLocationsTable() {
  return new Promise<void>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(`DROP TABLE IF EXISTS locations;`, [], () => {
        resolve();
      });
    });
  });
}

export function addJourneyLocation(
  journeyId: string,
  location: KalmanLocation
) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO locations (

        journeyId,
        timestamp,
        latitude,
        longitude,
        accuracy,
        variance

      ) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        journeyId,
        location.timestamp,
        location.latitude,
        location.longitude,
        location.accuracy,
        location.variance,
      ]
    );
  });
}

export function getJourneyLocations(journeyId: string) {
  return new Promise<KalmanLocation[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations WHERE journeyId = ? ORDER BY timestamp ASC;`,
        [journeyId],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
          return true; // See https://stackoverflow.com/a/67437415/398287
        }
      );
    });
  });
}

export function getLastJourneyLocation(journeyId: string) {
  return new Promise<KalmanLocation | undefined>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations WHERE journeyId = ? ORDER BY timestamp DESC LIMIT 1;`,
        [journeyId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        }
      );
    });
  });
}

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
