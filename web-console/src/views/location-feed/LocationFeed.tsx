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
    journey_location(order_by: { id: desc }, limit: 20) {
      id
      journey_id
      location
      timestamp
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

  const [{ data, error, fetching }] = useSubscription(
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
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((location) => {
            return (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.journey_id}</td>
                <td>{location.location}</td>
                <td>{location.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <pre className="error">{JSON.stringify(error, null, 2)}</pre>
      {fetching && <pre>Fetching...</pre>}
    </main>
  );
}
