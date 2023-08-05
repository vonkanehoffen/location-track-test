import { graphql } from "../../gql";
import { client } from "../../providers/UrqlProvider";
import { LocationObject } from "expo-location";
import { useQuery } from "urql";

const InsertLocationQuery = graphql(`
  mutation InsertLocation($l: journey_location_insert_input!) {
    insert_journey_location(objects: [$l]) {
      affected_rows
      returning {
        id
        journey_id
        location
        timestamp
      }
    }
  }
`);

export const sendLocation = async (location: LocationObject) => {
  const result = await client.mutation(InsertLocationQuery, {
    l: {
      journey_id: "1",
      location: `${location.coords.latitude},${location.coords.longitude}`,
    },
  });

  console.log("[tracking]", "Sent new location", result);
};

const LocationsQuery = graphql(`
  query Locations {
    journey_location(order_by: { id: desc }, limit: 2000) {
      id
      location
    }
  }
`);

export const useLocations = (journeyId: string) => {
  return useQuery({
    query: LocationsQuery,
  });
};
