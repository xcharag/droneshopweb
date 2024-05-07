import {gql} from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation AuthSellerLogin($email: String!, $password: String!) {
    authSellerLogin(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export const GET_SELLER_QUERY = gql`
  query GetSeller($token: String!) {
    getSeller(token: $token) {
      id
      name
      lastName
      email
      created
    }
  }
`;