import {gql} from "@apollo/client";
export const UPDATE_ORDER_STATUS = gql `
    mutation Mutation($updateOrderId: ID, $input: inputOrder) {
        updateOrder(id: $updateOrderId, input: $input) {
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