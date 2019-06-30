import TimestampType from "./timestamp_type";

const typeDefs = `
scalar TimestampType

type Product {
  id: ID!
  transactions: [Transaction!] 
}

type Transaction {
  id: ID!
  quantity: Int
  time: TimestampType
}

type Query {
    products: [Product],
    product(id: ID!): Product,
}

type Mutation {
  createProduct: Product!
  updateProduct(id: ID!, quantity: Int!): Product!
  deleteProduct(id: ID!): Product!
}

type Subscription {
  product: productSubscriptionPayload! 
}

type productSubscriptionPayload {
  mutationType: String!
  node: Product!
}`;

export default typeDefs;
