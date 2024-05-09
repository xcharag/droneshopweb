import {gql} from "@apollo/client";

export const ADD_SELLER = gql`
   mutation NewSeller($input: inputSeller) {
    newSeller(input: $input) {
        id
        name
        lastName
        email
        created
    }
}
`;

export const GET_SELLERS= gql`
    
     query Query {
      getAllSellers {
        id
        name
        lastName
        email
        created
      }
    }
 `;