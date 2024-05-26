import {gql} from "@apollo/client";

export const GET_CLIENTS_BY_SELLER = gql`
    query GetClientsBySeller($getClientsBySellerId: ID) {
       getClientsBySeller(id: $getClientsBySellerId) {
        id
        name
        lastName
        company
        phoneNumber
        email
        password
        created
        seller
        }
    }

`;

export const UPDATE_CLIENT = gql `
    mutation ClientUpdate($clientUpdateId: ID!, $input: inputClient) {
        clientUpdate(id: $clientUpdateId, input: $input) {
         id
         name
         lastName
         company
         phoneNumber
         email
         password
         created
         seller
        }
   }

`;

export const  DELETE_CLIENT = gql `
    mutation DeleteClient($deleteClientId: ID) {
  deleteClient(id: $deleteClientId)
}
`;

export const ADD_CLIENT = gql`
    mutation NewClient($input: inputClient) {
      newClient(input: $input) {
        id
        name
        lastName
        company
        phoneNumber
        email
        password
        created
        seller
      }
    }
`;

export const GET_REPORT_BEST_CLIENTS = gql`
   query GetTopClients($getTopClientsId: ID) {
  getTopClients(id: $getTopClientsId) {
    id
    name
    lastName
    email
    totalSpent
  }
}
    `;