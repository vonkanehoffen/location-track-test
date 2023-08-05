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
  documents: "./services/**/*.ts",
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
    },
    "./gql/schema.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
