import {gql} from "@apollo/client";

export const NEW_PRODUCT = gql `
    mutation Mutation($input: inputProduct) {
        newProduct(input: $input) {
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