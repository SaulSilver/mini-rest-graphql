# Express & ES6 REST API Boilerplate

This is based on [boilerplate](https://github.com/developit/express-es6-rest-api) for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)

### Remarks

1. There is no database, just a simple `products.js` file with an array of products.
2. The REST API contains the verb `GET` only to fetch product(s). `POST` is not implemented because it is not normally used for fetching data.

## Getting Started

```sh
# clone it then
# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

## Part 1: REST

Query the products with REST (GET) api.

Query for all products

    /products

Output is similar to:

```
[
  {
    id: "abc123",
    transaction: [
      {
        id: "abc123",
        quantity: 123,
        time: 1559328117100
      }
    ]
  },
  {
    id: "abc124",
    transaction: [
      {
        id: "abc124",
        quantity: 124,
        time: 1559328117120
      }
    ]
  }
]
```

Query for one particular product by id

    /products/:id

Output is similar to:

```
{
  id: "abc123",
  transaction: [
    {
      id: "abc123",
      quantity: 123,
      time: 1559328117100
    }
  ]
}
```

## Part 2; GraphQL

Query the same products with GraphQL.

```
query products {
  products {
    id
    transactions {
      id
      quantity
      time
    }
  }
}
```

And then for single product:

```
query product {
  product(id: "abc123") {
    id
    transactions {
      id
      quantity
      time
    }
  }
}
```

Output is same as Part 1: Rest API above.

## Part 3: GraphQL Subscriptions

A minimal websocket and/or graphql subscription solution which sends updates to the client about single product.

So, whenever we add/remove/update a single transaction on any product or the whole product, the playground/ws client should know about that specific post and transaction in some way.

Showcase/provide your own subscription resolver without us providing any specific format.

Example workflow on playground:

1. I am subscribing to products
2. On another tab I triggered createProduct mutation
3. On the subscribing tab, it shows something was created
4. I go back to other tab and trigger createProduct again
5. On the subscribing tab, it shows something was created

Link to sample video: https://www.youtube.com/watch?v=LVUEpv8Mvr0&

## License

MIT
