import { gql } from "@apollo/client";

export const GET_TOP_SELLER = gql `
    query Query {
      getTopSellers {
        id
        name
        lastName
        totalSpent
      }
    }`;
