import products from "../models/products";

export const findProduct = id => products.find(product => product.id === id);
