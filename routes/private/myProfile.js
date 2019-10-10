const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const User = require("../../models/User");
const Order = require("../../models/Order");
const nodemailer = require("nodemailer");

const uploadCloud = require("../../config/cloudinary.config");

const {
  myProfile,
  editProfile,
  editProfilePost,
  editImage,
  editImagePost,
  myOffers,
  order,
  finalOrder,
  newOrder,
  declineOrder,
  acceptOrder,
  cancelOrder,
  userProfile
} = require("../../controllers/myProfile.controller");

router.get("/my-profile", myProfile);
router.get("/my-profile/:id/edit", editProfile);
router.post("/my-profile/:id", editProfilePost);
router.get("/my-profile/:id/edit-image", editImage);
router.post(
  "/my-profile/image/:id",
  uploadCloud.single("userImage"),
  editImagePost
);
router.get("/my-profile/my-offers", myOffers);
router.get("/order/:id", order);
router.get("/final-order", finalOrder);
router.post("/order", newOrder);
router.get("/:id/decline", declineOrder);
router.get("/:id/accept", acceptOrder);
router.get("/:id/cancel", cancelOrder);
router.get("/user/:id", userProfile);

module.exports = router;
