import { GraphQLServer } from "graphql-yoga";
import TimestampType from "./timestamp_type";
import config from "../config.json";
import products from "../models/products";
import { findProduct } from "../utils";

// Normally I'd split this into 3 files; typeDefs.js, resolver.js and index.js.
// But this is a small scale so no need to overkill it, I think
const typeDefs = `
scalar TimestampType

type Query {
    products: [Product],
    product(id: ID!): Product,
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
  },
  Product: {
    // product transaction is an array in the "DB" but
    // it's called `transactions` in the GraphQL Schema (not sure why)
    transactions: product => product.transaction
  }
};

export default function() {
  const graphQlServer = new GraphQLServer({ typeDefs, resolvers });
  const options = { port: process.env.GRAPHQL_PORT || config.graphQlPort };
  graphQlServer.start(options, () =>
    console.log(`GraphQL server is running on port ${options.port}`)
  );

  return graphQlServer;
}
