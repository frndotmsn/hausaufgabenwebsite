/* @refresh reload */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@merged/solid-apollo';
import { render, Suspense } from 'solid-js/web';

import App from './App';

export const client = new ApolloClient(
    {
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache(),
    }
);

render(() => (
<ApolloProvider client={client}>
    <Suspense fallback={<>App is loading…</>}>
        <App />
    </Suspense>
</ApolloProvider>
), document.getElementById('root') as HTMLElement);