import {gql} from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
    query GetAllProducts {
      getAllProducts {
        id
        name
        stock
        price
        created
        model
        specifications
      }
    }
`;