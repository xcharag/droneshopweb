import {gql} from "@apollo/client";

export const GET_ORDERS_BY_SELLER = gql `
    query GetOrdersBySeller($getOrdersBySellerId: ID) {
  getOrdersBySeller(id: $getOrdersBySellerId) {
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
}`
;