import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://nestjs:3000/graphql",
  documents: "graphql/documents/**/*.graphql",
  generates: {
    "graphql/@generated/": {
      preset: "client",
      plugins: ["typescript", "typescript-document-nodes"],
    },
  },
};

export default config;
