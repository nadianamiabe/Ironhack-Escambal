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

router.get("/products", async (req, res1, next) => {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost/escambalApp";

  try {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("escambalApp");

      dbo
        .collection("products")
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "user",
              foreignField: "_id",
              as: "productUser"
            }
          }
        ])
        .toArray(function(err, res) {
          if (err) throw err;
          console.log(res);

          res1.render("public/products", { res });
          db.close();
        });
    });
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
