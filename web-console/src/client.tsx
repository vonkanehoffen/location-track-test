import { createClient, defaultExchanges, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";

const wsClient = createWSClient({
  url: "ws://location-track-test.hasura.app/v1/graphql",
});

export const client = createClient({
  url: "https://location-track-test.hasura.app/v1/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink) => ({
          unsubscribe: wsClient.subscribe(
            { query: operation.query, variables: operation.variables },
            sink
          ),
        }),
      }),
    }),
  ],
  // fetchOptions: () => {
  //   const token = getToken();
  //   return {
  //     headers: { "x-hasura-admin-secret": process.env.HASURA_SECRET as string },
  //   };
  // },
});
