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
`