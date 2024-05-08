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
`;

export const UPDATE_PRODUCT = gql`
    mutation ProductUpdate($productUpdateId: ID!, $input: inputProduct) {
        productUpdate(id: $productUpdateId, input: $input) {
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