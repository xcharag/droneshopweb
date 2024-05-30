import {gql} from "@apollo/client";
export const UPDATE_ORDER_STATUS = gql `
   mutation Mutation($updateOrderStatusId: ID!, $input: UpdateOrderInput!) {
       updateOrderStatus(id: $updateOrderStatusId, input: $input) {
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
   }`;