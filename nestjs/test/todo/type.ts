import { GraphQLError } from 'graphql';

export type SingleGraphQLResponse<T> = {
  body: {
    kind: 'single';
    singleResult: {
      data?: T;
      errors?: GraphQLError[];
    };
  };
};
