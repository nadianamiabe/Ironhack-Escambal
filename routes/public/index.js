const express = require("express");

const router = express.Router();
const Product = require("../../models/Product");

/* GET home page */
router.get("/", (req, res) => {
  res.render("public/index");
});

router.get("/about", (req, res) => {
  res.render("public/about");
});

router.get("/products", async (req, res, next) => {
  console.log(req.body);

  try {
    const products = await Product.find();
    res.render("public/products", { products });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
