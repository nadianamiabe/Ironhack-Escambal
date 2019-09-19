const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/home", async (req, res) => {
  res.render("private/home");
});
router.get("/my-profile", async (req, res, next) => {
  res.render("private/my-profile");
});

router.get("/my-profile/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("private/products", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/my-profile/pending", async (req, res, next) => {
  res.render("private/pending");
});

router.get("/my-profile/my-offers", async (req, res, next) => {
  res.render("private/my-offers");
});

router.get("/products/insert-product", async (req, res, next) => {
  res.render("private/insertProduct");
});

router.post("/products", async (req, res, next) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  newProduct
    .save()
    .then(() => {
      console.log(`Product ${newProduct} created`);
      res.redirect("my-profile/products");
    })
    .catch(error => {
      res.render("private/insertProduct");
      console.log(error);
    });
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/products-details", product);
  } catch (error) {
    console.log(error);
  }
});

router.get("/products/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect("/my-profile/products");
  } catch (error) {
    console.log(error);
  }
});

router.get("/products/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/edit-product", product);
  } catch (error) {
    console.log(error);
  }
});

router.post("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  try {
    await Product.findByIdAndUpdate(id, product);
    res.redirect("/my-profile/products");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
