import { GraphQLServer } from "graphql-yoga";
import config from "../config.json";
import products from "../models/products";
import { findProduct } from "../utils";

export default function() {
  const typeDefs = `
  type Query {
      products: [product],
    product(id: String): String!
  }
`;

  const resolvers = {
    Query: {
      product: (_, { id }) => findProduct(id),
      products: () => products;
    }
  };

  const graphQlServer = new GraphQLServer({ typeDefs, resolvers });
  const options = { port: process.env.GRAPHQL_PORT || config.graphQlPort };
  graphQlServer.start(options, () =>
    console.log(`GraphQL server is running on port ${options.port}`)
  );

  return graphQlServer;
}
