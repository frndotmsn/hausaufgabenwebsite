import { OperationVariables, QueryOptions, TypedDocumentNode } from "@apollo/client";
import { Accessor, createMemo, createResource } from "solid-js";
import { client } from "..";
  
type CreateQueryOptions<TData, TVariables> = Omit<QueryOptions<TVariables, TData>, 'query'>

type Variables = {
    [key: string]: Accessor<unknown>;
}

export const OwnQuery = <TData = {}, TVariables = Variables>(
    query: TypedDocumentNode<TData, TVariables>,
    initialValue: TData,
    options: CreateQueryOptions<TData, TVariables> = {}
) => {
    const variables = createMemo(() => Object.fromEntries(Object.entries(options.variables).map((v) => [v[0], v[1]()])));
    return createResource<TData, QueryOptions<OperationVariables, TData>>(
        { ...options, query }, async (k) => { console.log("refetching..."); return (await client.query<TData, OperationVariables>({ ...k, variables: variables() })).data }, { initialValue, }
    );
}   