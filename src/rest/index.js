import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "../config.json";

import { version } from "../../package.json";
import { Router } from "express";
import products from "../models/products";
import { findProduct } from "../utils";

const router = () => {
  const api = Router();
  api.get("/", (req, res) => res.json({ version }));

  api.get("/products", (req, res) => res.json(products));

  api.get("/products/:id", (req, res) => {
    const { id: reqProdId } = req.params;
    const notFound = { message: `Product with ID ${reqProdId} does not exist` };
    res.json(findProduct(reqProdId) || notFound);
  });
  return api;
};

export default () => {
  const app = express();

  app.server = http.createServer(app);

  // 3rd party middleware
  app.use(
    cors({
      exposedHeaders: config.corsHeaders
    })
  );

  app.use(
    bodyParser.json({
      limit: config.bodyLimit
    })
  );

  app.use("/", router());
  app.server.listen(process.env.REST_PORT || config.port, () => {
    console.log(`REST server is running on port ${app.server.address().port}`);
  });
  return app;
};
