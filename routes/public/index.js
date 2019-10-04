const express = require("express");

const router = express.Router();
const Product = require("../../models/Product");
const User = require("../../models/User");
const ProductUser = require("../../models/ProductUser");

/* GET home page */
router.get("/", (req, res) => {
  res.render("public/index");
});

router.get("/about", (req, res) => {
  res.render("public/about");
});

let products;

router.get("/products", async (req, res, next) => {
  const products = await Product.find();

  try {
    const filteredProducts = products.filter(
      product => product.status === "Disponível"
    );
    res.render("public/products", { filteredProducts });
  } catch (error) {
    console.log(error);
  }
});

router.post("/products", async (req, res) => {
  const { category } = req.body;
  try {
    const products = await Product.find();
    const filteredProducts = products.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
    console.log(filteredProducts);

    res.render("public/filtered-products", { products: filteredProducts });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
