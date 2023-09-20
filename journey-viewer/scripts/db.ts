const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

function queryLocationsDb() {
  const db = new sqlite3.Database("test-data/norwich-1/locations.db");
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM locations WHERE journeyId = '2023-09-17T13:00'",
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const data = JSON.stringify(rows);
          fs.writeFile("locations.json", data, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        }
      }
    );
    db.close();
  });
}

queryLocationsDb()
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.error(err);
  });
