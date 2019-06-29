import { version } from "../../package.json";
import { Router } from "express";
import products from "../models/products";

export default ({ config }) => {
  let api = Router();
  api.get("/", (req, res) => res.json({ version }));

  api.get("/products", (req, res) => res.json(products));

  api.get("/products/:id", (req, res) => {
    const { id: reqProdId } = req.params;

    const requestedProduct = products.find(product => product.id === reqProdId);
    const notFound = { message: `Product with ID ${reqProdId} does not exist` };

    res.json(requestedProduct || notFound);
  });
  return api;
};
