import { createClient } from "urql";

export const client = createClient({
  url: "https://location-track-test.hasura.app/v1/graphql",
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { "x-hasura-admin-secret": process.env.HASURA_SECRET as string },
  //   };
  // },
});
