import React, { PropsWithChildren } from "react";
import { Provider } from "urql";
import { Client, fetchExchange } from "@urql/core";
import { config } from "../config";
import { makeAsyncStorage } from "@urql/storage-rn";
import { offlineExchange } from "@urql/exchange-graphcache";
import schema from "../gql/schema.json";

const storage = makeAsyncStorage({
  dataKey: "graphcache-data", // The AsyncStorage key used for the data (defaults to graphcache-data)
  metadataKey: "graphcache-metadata", // The AsyncStorage key used for the metadata (defaults to graphcache-metadata)
  maxAge: 7, // How long to persist the data in storage (defaults to 7 days)
});

const cache = offlineExchange({
  schema,
  storage,
  updates: {
    /* ... */
  },
  optimistic: {
    // insert_journey_location(args, cache, info) {
    //   console.log("optimistic", args);
    //   return {
    //     __typename: "journey_location",
    //     id: args.id,
    //     location: "0,0",
    //   };
    // },
  },
});

export const client = new Client({
  url: config.apiBase,
  exchanges: [cache, fetchExchange],
});

// import { createClient, defaultExchanges, subscriptionExchange } from "urql";
// import { createClient as createWSClient } from "graphql-ws";

// const wsClient = createWSClient({
//   url: "ws://location-track-test.hasura.app/v1/graphql",
// });

// export const client = createClient({
//   url: "https://location-track-test.hasura.app/v1/graphql",
//   exchanges: [
//     ...defaultExchanges,
//     subscriptionExchange({
//       forwardSubscription: (operation) => ({
//         subscribe: (sink) => ({
//           unsubscribe: wsClient.subscribe(
//             { query: operation.query, variables: operation.variables },
//             sink
//           ),
//         }),
//       }),
//     }),
//   ],
//   // fetchOptions: () => {
//   //   const token = getToken();
//   //   return {
//   //     headers: { "x-hasura-admin-secret": process.env.HASURA_SECRET as string },
//   //   };
//   // },
// });

export const UrqlProvider = ({ children }: PropsWithChildren) => {
  return <Provider value={client}>{children}</Provider>;
};
