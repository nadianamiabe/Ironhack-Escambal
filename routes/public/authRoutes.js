const express = require("express");
const router = express.Router();

const {
  getSignUp,
  postSignup,
  getLogin,
  postLogin,
  getLogout
} = require("../../controllers/authRoutes.controller");

router.get("/signup", getSignUp);
router.post("/signup", postSignup);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/logout", getLogout);

module.exports = router;
