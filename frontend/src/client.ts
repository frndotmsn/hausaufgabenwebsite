import { ApolloClient, InMemoryCache } from '@merged/solid-apollo';

export const client = new ApolloClient(
    {
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache(),
    }
);