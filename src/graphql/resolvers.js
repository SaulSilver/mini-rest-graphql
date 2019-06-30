import products from "../models/products";
import { findProduct, randomize } from "../utils";

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
        product: {
          mutationType: "CREATE",
          node: newProd
        }
      });
      return newProd;
    },
    deleteProduct: (parent, { id }, { pubsub }) => {
      const prodIndex = products.findIndex(product => product.id === id);
      if (prodIndex < 0) throw new Error("Product does not exist");

      const deletedProd = products.splice(prodIndex, 1)[0];
      pubsub.publish("product", {
        product: {
          mutationType: "DELETE",
          node: deletedProd
        }
      });
      return deletedProd;
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

export default resolvers;
