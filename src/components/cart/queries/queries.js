import {gql} from '@apollo/client';

export const ADD_ORDER_MUTATION = gql`
    mutation NewOrder($input: inputOrder) {
      newOrder(input: $input) {
        id
        order {
          id
          quantity
        }
        client
        seller
        created
        status
        total
      }
    }
`;