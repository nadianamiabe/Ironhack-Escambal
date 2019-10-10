const express = require("express");
const router = express.Router();

const uploadCloud = require("../../config/cloudinary.config");

const {
  home,
  showProducts,
  filteredProducts,
  userProductDetails,
  myProducts,
  insertProduct,
  insertProductPost,
  pendingProducts,
  myProductsDetails,
  deleteMyProduct,
  editMyProducts,
  editMyProductsPost
} = require("../../controllers/privateProducts.controller");

router.get("/home", home);
router.get("/home/products", showProducts);
router.post("/home/products", filteredProducts);
router.get("/products/:id", userProductDetails);
router.get("/my-profile/my-products", myProducts);
router.get("/my-products/insert-product", insertProduct);
router.post("/my-products", uploadCloud.single("imageUrl"), insertProductPost);
router.get("/my-profile/pending", pendingProducts);
router.get("/my-products/:id", myProductsDetails);
router.get("/my-products/:id/delete", deleteMyProduct);
router.get("/my-products/:id/edit", editMyProducts);
router.post("/my-products/:id", editMyProductsPost);

module.exports = router;
