import * as dotenv from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://location-track-test.hasura.app/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_SECRET as string,
        },
      },
    },
  ],
  documents: "src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
