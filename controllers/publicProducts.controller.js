const express = require("express");
const Product = require("../models/Product");

const showProducts = async (req, res, next) => {
  const products = await Product.find();
  try {
    const filteredProducts = products.filter(
      product => product.status === "Disponível"
    );
    res.render("public/products", { filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

const filteredProducts = async (req, res) => {
  const { category } = req.body;
  try {
    const products = await Product.find();
    const filteredProducts = products.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase()) && 
      product.status === "Disponível" 
    );

    res.render("public/filtered-products", { products: filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showProducts,
  filteredProducts
};
