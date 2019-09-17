const express = require("express");
const router = express.Router();

router.get("/home", async (req, res) => {
  res.render("private/home");
});
router.get("/my-profile", async (req, res, next) => {
  res.render("private/my-profile");
});

router.get("/my-profile/products", async (req, res, next) => {
  res.render("private/products");
});

router.get("");

module.exports = router;
