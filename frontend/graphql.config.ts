import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL,
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated/output.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        importOperationTypesFrom: "",
        preResolveTypes: true,
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloClientVersion: 3,
        importFrom: "@apollo/client",
        gqlImport: "@apollo/client#gql",
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
