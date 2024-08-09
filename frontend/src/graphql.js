import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

function GraphQLProvider({ appId, port, children }) {
	let client = apolloClient(appId, port);
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

function apolloClient(appId, port) {
	const link = new GraphQLWsLink(
		createClient({
			url: `ws://localhost:${port}/ws`,
		})
	);

	const httpLink = new HttpLink({
		uri: `http://localhost:${port}/applications/` + appId,
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === "OperationDefinition" && definition.operation === "subscription";
		},
		link,
		httpLink
	);

	return new ApolloClient({
		link: splitLink,
		cache: new InMemoryCache(),
	});
}

export default GraphQLProvider;

export {apolloClient};
