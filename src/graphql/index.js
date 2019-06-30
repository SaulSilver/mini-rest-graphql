import { GraphQLServer, PubSub } from "graphql-yoga";
import TimestampType from "./timestamp_type";
import config from "../config.json";
import products from "../models/products";
import { findProduct, randomize } from "../utils";

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

type Mutation {
  createProduct: Product!
  deleteProduct(id: ID!): Product!
}

type Subscription {
  product: Product!
}
`;

const resolvers = {
  Query: {
    products: () => products,
    product: (parent, { id }) => findProduct(id)
  },
  Product: {
    // product transaction is an array in the "DB" but
    // it's called `transactions` in the GraphQL Schema (not sure why)
    transactions: product => product.transaction
  },
  Mutation: {
    createProduct: (parent, args, { pubsub }) => {
      const newProd = {
        id: randomize(600).toString(),
        transaction: [
          {
            id: randomize(600).toString(),
            quantity: randomize(100),
            time: 1559328117100
          }
        ]
      };
      products.push(newProd);
      pubsub.publish("product", {
        product: newProd
      });
      return newProd;
    },
    deleteProduct: (parent, { id }) => {
      const prodIndex = products.findIndex(product => product.id === id);
      if (prodIndex < 0) throw new Error("Product does not exist");

      const deletedProd = products.splice(prodIndex, 1);
      return deletedProd[0];
    }
  },
  Subscription: {
    product: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator("product");
      }
    }
  }
};

export default function() {
  const pubsub = new PubSub();
  const graphQlServer = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
  const options = { port: process.env.GRAPHQL_PORT || config.graphQlPort };
  graphQlServer.start(options, () =>
    console.log(`GraphQL server is running on port ${options.port}`)
  );

  return graphQlServer;
}
