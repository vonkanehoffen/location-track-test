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
  documents: "components/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "lib/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
