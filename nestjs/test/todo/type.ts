import { GraphQLError } from 'graphql';

type SingleGraphQLResponseError = {
  extensions: {
    originalError: {
      message: string[];
    };
  };
} & GraphQLError;
export type SingleGraphQLResponse<T> = {
  body: {
    kind: 'single';
    singleResult: {
      data?: T;
      errors?: SingleGraphQLResponseError[];
    };
  };
};
