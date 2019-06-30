import TimestampType from "./timestamp_type";

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
  product: productSubscriptionPayload! 
}

type productSubscriptionPayload {
  mutationType: String!
  node: Product!
}`;

export default typeDefs;
