const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

const uploadCloud = require("../config/cloudinary.config");

const myProfile = async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const user = await User.findById(userId);

    res.render("private/my-profile", { user });
  } catch (error) {
    console.log(error);
  }
};

const editProfile = async (req, res, next) => {
  const { id } = req.params;

  try {
    const profile = await User.findById(id);
    res.render("private/my-profile-edit", profile);
  } catch (error) {
    console.log(error);
  }
};

const editProfilePost = async (req, res, next) => {
  const { id } = req.params;
  const profile = req.body;
  try {
    await User.findByIdAndUpdate(id, profile);
    res.redirect("/my-profile");
  } catch (error) {
    console.log(error);
  }
};

const editImage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const profile = await User.findById(id);
    console.log(profile);
    res.render("private/edit-image", profile);
  } catch (error) {
    console.log(error);
  }
};

const editImagePost = async (req, res, next) => {
  const { id } = req.params;
  const profile = req.body;
  const userImage = req.file.url;
  profile["userImage"] = userImage;

  try {
    await User.findByIdAndUpdate(id, profile);
    res.redirect("/my-profile");
  } catch (error) {
    console.log(error);
  }
};

const myOffers = async (req, res, next) => {
  const currentUser = req.session.currentUser._id;

  try {
    const orders = await Order.find({
      userId: currentUser,
    })
      .populate("userProducts")
      .populate("myProducts")
      .populate("myUser");

    const filteredOrders = orders.filter((order) => order.accept === false);

    res.render("private/my-offers", { filteredOrders });
  } catch (error) {
    console.log(error);
  }
};

const order = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser;
  try {
    const productOrder = await Product.findById(id);
    const userProduct = await Product.find({ user: userId });

    const filteredProducts = userProduct.filter(
      (product) => product.status === "Disponível"
    );

    res.render("private/order", { productOrder, filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

const finalOrder = (req, res) => {
  res.render("private/final-order");
};

const newOrder = async (req, res, next) => {
  const { userProducts, userId } = req.body;
  const myProducts = [];
  const body = req.body;
  const keys = Object.keys(req.body);

  keys.forEach((key) => {
    if (body[key] === "on") {
      myProducts.push(key);
    }
  });

  const newOrder = new Order({
    myProducts,
    userProducts,
    userId,
    myUser: req.session.currentUser._id,
  });
  newOrder.save().then(async () => {
    console.log(`Order ${newOrder} created`);
    myProducts.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        status: "Pendente",
      });
    });

    const offerUser = await User.findById(userId);

    const $usuario = "escambalapp@gmail.com";
    const $senha = "ladygaga123456";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: $usuario,
        pass: $senha,
      },
    });
    const $destinatario = offerUser.email;

    const mailOptions = {
      from: $usuario,
      to: $destinatario,
      subject: "Escambal : Você recebeu uma oferta em algum produto!",
      text: `Tudo bem, ${offerUser.name}?
      Você recebeu uma oferta nova! Clique no link para visualizar
      https://escambal-app.herokuapp.com/my-profile/my-offers

      Estamos torcendo para que você tenha recebido uma ótima oferta.

      Atenciosamente,
      Equipe Escambal.
      `,
    };
    transporter
      .sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email enviado: " + info.response);
        }

        res.redirect("/final-order");
      })
      .catch((err) => {
        res.render("private/home");
        console.log(err);
      });
  });
};

const declineOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findById(id);
    orders.myProducts.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        status: "Disponível",
      });
    });

    await Order.findByIdAndDelete(id);
    console.log("pedido deletado");

    res.redirect("/my-profile/my-offers");
  } catch (error) {
    console.log(error);
  }
};

const acceptOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);

    order.myProducts.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        status: "Indisponível",
      });
    });

    order.userProducts.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        status: "Indisponível",
      });
    });

    const updatedOrder = await Order.findByIdAndUpdate(order, {
      accept: true,
    });

    res.redirect("/my-profile/my-offers");
  } catch (error) {
    console.log(error);
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.findById(id);

    orders.myProducts.forEach(async (product) => {
      await Product.findByIdAndUpdate(product, {
        status: "Disponível",
      });
    });

    await Order.findByIdAndDelete(id);

    res.redirect("/my-profile/pending");
  } catch (error) {
    console.log(error);
  }
};

const userProfile = async (req, res) => {
  const { id } = req.params;
  const userProducts = [];
  try {
    const allProducts = await Product.find();

    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].user == id) {
        userProducts.push(allProducts[i]);
      }
    }

    const user = await User.findById(id);

    res.render("private/user-profile", { userProducts, user });
  } catch (error) {
    console.log(error);
  }
};

const about = (req, res) => {
  res.render("private/about");
};

module.exports = {
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
  userProfile,
  about,
};
