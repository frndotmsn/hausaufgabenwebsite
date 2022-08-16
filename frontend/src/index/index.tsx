/* @refresh reload */
import { ApolloProvider } from '@merged/solid-apollo';
import { render, Suspense } from 'solid-js/web';
import { client } from '../client';

import App from './App';

render(() => (
<ApolloProvider client={client}>
    <Suspense fallback={<>App is loading…</>}>
        <App />
    </Suspense>
</ApolloProvider>
), document.getElementById('root') as HTMLElement);