import products from "../models/products";

export const findProduct = id => products.find(product => product.id === id);

export const findProdIndex = id => products.findIndex(product => product.id === id);
// Used to create random IDs
export const randomize = max => Math.floor(Math.random() * Math.floor(max));
