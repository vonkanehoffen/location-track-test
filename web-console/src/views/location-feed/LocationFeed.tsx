import React from "react";
import { useQuery, useSubscription } from "urql";
import { graphql } from "../../gql";

const allLocationData = graphql(`
  query all_location_data($limit: Int!) {
    journey_location(limit: $limit) {
      id
      journey_id
      location
    }
  }
`);

const locationSubscription = graphql(`
  subscription location_sub {
    journey_location {
      id
      journey_id
      location
    }
  }
`);

const handleSubscription = (locations = [], response: any) => {
  // Merge incoming data to existing
  const newLocations = response.journey_location;
  const merged = newLocations.map((newLoc) => {
    const loc = locations.find((loc) => loc.id === newLoc.id);
    return { ...newLoc, ...loc };
  });

  return merged;
};

export function LocationFeed() {
  // const [{ data, error }] = useQuery({
  //   query: allLocationData,
  //   variables: {
  //     limit: 10,
  //   },
  // });

  const [{ data, error }] = useSubscription(
    { query: locationSubscription },
    handleSubscription
  );

  console.log("res.data", data);

  return (
    <main>
      <h1>Location Feed</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>journey_id</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((location) => {
            console.log("WAT", location.id);
            return (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.journey_id}</td>
                <td>{location.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
