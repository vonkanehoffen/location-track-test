import React from "react";
import { useQuery } from "urql";
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

export function LocationFeed() {
  const [{ data, error }] = useQuery({
    query: allLocationData,
    variables: {
      limit: 10,
    },
  });

  return (
    <main>
      <h1>Location Feed</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</pre>
    </main>
  );
}
