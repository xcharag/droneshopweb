import { ApolloClient, InMemoryCache } from '@apollo/client';

export function createApolloClient() {
    return new ApolloClient({
        uri: 'http://localhost:4000/graphql', // Replace this with your GraphQL endpoint
        cache: new InMemoryCache(),
    });
}