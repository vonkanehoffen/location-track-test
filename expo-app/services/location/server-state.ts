import { gql } from "@urql/core";
import { client } from "../../providers/UrqlProvider";
import { LocationObject } from "expo-location";

const InsertLocationQuery = gql`
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
`;

export const sendLocation = async (location: LocationObject) => {
  const result = await client.mutation(InsertLocationQuery, {
    l: {
      journey_id: "1",
      location: `${location.coords.latitude}, ${location.coords.longitude}`,
    },
  });

  console.log("[tracking]", "Sent new location", result);
};
