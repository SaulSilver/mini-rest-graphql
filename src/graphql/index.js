import { GraphQLServer } from "graphql-yoga";
import TimestampType from "./timestamp_type";
import config from "../config.json";
import products from "../models/products";
import { findProduct } from "../utils";

export default function() {
  const typeDefs = `
  scalar TimestampType

  type Query {
      products: [Product],
      product(id: ID!): Product
  }

  type Product {
    id: ID!
    transactions: [Transaction!] 
  }

  type Transaction {
    id: ID!
    quantity: Int
    time: TimestampType
  }
`;

  const resolvers = {
    Query: {
      products: () => products,
      product: (_, { id }) => findProduct(id)
    }
  };

  const graphQlServer = new GraphQLServer({ typeDefs, resolvers });
  const options = { port: process.env.GRAPHQL_PORT || config.graphQlPort };
  graphQlServer.start(options, () =>
    console.log(`GraphQL server is running on port ${options.port}`)
  );

  return graphQlServer;
}
