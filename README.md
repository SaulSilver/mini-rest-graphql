# Express & ES6 REST API Boilerplate

This is based on [boilerplate](https://github.com/developit/express-es6-rest-api) for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
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

Query the products with REST (POST and/or GET) api.

Query for all products

    /products

Expected output should be similar to:

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

Expected output should be similar to:

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

## License

MIT
