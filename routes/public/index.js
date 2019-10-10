const express = require("express");
const router = express.Router();

const { index, about } = require("../../controllers/index.controller");

const {
  showProducts,
  filteredProducts
} = require("../../controllers/publicProducts.controller");

router.get("/", index);
router.get("/about", about);
router.get("/products", showProducts);
router.post("/products", filteredProducts);

module.exports = router;
