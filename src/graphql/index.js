import { GraphQLServer, PubSub } from "graphql-yoga";
import typeDefs from "./type_defs";
import resolvers from "./resolvers";
import config from "../config.json";

export default function() {
  const pubsub = new PubSub();
  const graphQlServer = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
  const options = { port: process.env.GRAPHQL_PORT || config.graphQlPort };
  graphQlServer.start(options, () =>
    console.log(`GraphQL server is running on port ${options.port}`)
  );

  return graphQlServer;
}
