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
  res.render("private/products");
});

router.get("/my-profile/pending", async (req, res, next) => {
  res.render("private/pending");
});

router.get("/my-profile/offers", async (req, res, next) => {
  res.render("private/offers");
});

router.get("/products/insert-product", async (req, res, next) => {
  res.render("private/insertProduct");
});

router.post("/products", async (req, res, next) => {
  console.log("banana");
  const newProduct = new Product(req.body);
  console.log("maçã");

  console.log(newProduct);
  newProduct
    .save()
    .then(() => {
      console.log(`Product ${newProduct} created`);
      res.redirect("private/products");
    })
    .catch(error => {
      res.render("private/insertProduct");
      console.log(error);
    });
});

module.exports = router;
