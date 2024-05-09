import {gql} from "@apollo/client";

export const GET_PRODUCTS = gql `
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

export const GET_TOP_SELLING_PRODUCTS = gql`
    query Query {
        getTopSoldProducts {
            id
            name
            stock
            price
            created
            model
            specifications
            totalQuantity
        }
    }
`;