import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation Login($loginInput: LoginInput!) {
    login(login: $loginInput) {
      accessToken
    }
  }
`;
