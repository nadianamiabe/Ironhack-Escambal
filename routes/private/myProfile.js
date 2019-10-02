const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const User = require("../../models/User");
const Order = require("../../models/Order");

router.get("/home", async (req, res) => {
  res.render("private/home");
});

router.get("/home/products", async (req, res) => {
  const userId = req.session.currentUser._id;
  const usersProducts = [];
  try {
    const products = await Product.find();
    for (let i = 0; i < products.length; i++) {
      if (products[i].user != userId) {
        usersProducts.push(products[i]);
      }
    }
    res.render("private/home-products", { usersProducts });
  } catch (error) {}
});

router.post("/home/products", async (req, res) => {
  const { category } = req.body;
  const userId = req.session.currentUser._id;
  const usersProducts = [];
  const products = await Product.find();
  for (let i = 0; i < products.length; i++) {
    if (products[i].user != userId) {
      usersProducts.push(products[i]);
    }
  }

  try {
    const filteredProducts = usersProducts.filter(product =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
    console.log(filteredProducts);

    res.render("private/filtered-products", { products: filteredProducts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const user = await User.findById(product.user);

    const productUser = Object.assign({}, user, { product: product });
    console.log(productUser);

    res.render("private/products-details", productUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/my-profile", async (req, res, next) => {
  res.render("private/my-profile");
});

router.get("/my-profile/my-products", async (req, res, next) => {
  const userId = req.session.currentUser._id;

  try {
    const products = await Product.find({ user: userId });

    res.render("private/my-products", { products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/my-profile/pending", async (req, res, next) => {
  res.render("private/pending");
});

router.get("/my-profile/my-offers", async (req, res, next) => {
  const currentUser = req.session.currentUser._id;

  try {
    const orders = await Order.find({
      userId: currentUser
    })
      .populate("userProducts")
      .populate("myProducts")
      .populate("myUser");
    console.log(orders[0].myUser);
    // const myProducts = await Product.findById(orders.find(currentUser));
    // console.log(myProducts);

    res.render("private/my-offers", { orders });
  } catch (error) {
    console.log(error);
  }

  // const currentUser = req.session.currentUser._id;
  // const userProductsArray = [];
  // const myProductsArray = [];

  // const orders = await Order.find();

  // const products = await Product.find();
  // try {
  //   for (let i = 0; i < orders.length; i++) {
  //     if (currentUser === orders[i].userId[0]) {
  //       // userProductsArray.push(orders[i].userProducts[0]);
  //       const userProductsteste = await Product.findById(
  //         orders[i].userProducts
  //       );
  //       userProductsArray.push(userProductsteste);
  //       const userProductsteste2 = await Product.findById(orders[i].myProducts);
  //       myProductsArray.push(userProductsteste2);
  //       console.log(userProductsArray);
  //       console.log(myProductsArray);
  //     }
  //   }
  //   res.render("private/my-offers", {
  //     userProductsArray,
  //     myProductsArray
  //   });

  //   // console.log(userProducts);
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/my-products/insert-product", async (req, res, next) => {
  res.render("private/insertProduct");
});

router.post("/my-products", async (req, res, next) => {
  const { name, description, quantity, category, user } = req.body;
  // const user = req.session.currentUser._id;
  console.log(req.body);
  console.log(user);

  const newProduct = new Product({
    name,
    description,
    quantity,
    category,
    user: req.session.currentUser._id
  });
  newProduct
    .save()
    .then(() => {
      console.log(`Product ${newProduct} created`);
      res.redirect(`my-profile/my-products/`);
    })
    .catch(error => {
      res.render("private/insertProduct");
      console.log(error);
    });
});

router.get("/my-products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/my-products-details", product);
  } catch (error) {
    console.log(error);
  }
});

router.get("/my-products/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect("/my-profile/my-products");
  } catch (error) {
    console.log(error);
  }
});

router.get("/my-products/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/edit-product", product);
  } catch (error) {
    console.log(error);
  }
});

router.post("/my-products/:id", async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  try {
    await Product.findByIdAndUpdate(id, product);
    res.redirect("/my-profile/my-products");
  } catch (error) {
    console.log(error);
  }
});

router.get("/order/:id", async (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.currentUser;
  try {
    const productOrder = await Product.findById(id);
    const userProduct = await Product.find({ user: userId });

    res.render("private/order", { productOrder, userProduct });
  } catch (error) {
    console.log(error);
  }
});

router.post("/order", async (req, res, next) => {
  const { userProducts, userId } = req.body;
  const myProducts = [];
  console.log("$$$$$$$$$$$$$$$$$$$$4", req.body);
  const body = req.body;
  const keys = Object.keys(req.body);

  // const teste = Object.values(req.body);
  keys.forEach(key => {
    if (body[key] === "on") {
      myProducts.push(key);
    }
  });
  console.log(myProducts);

  const newOrder = new Order({
    myProducts,
    userProducts,
    userId,
    myUser: req.session.currentUser._id
  });
  newOrder
    .save()
    .then(() => {
      console.log(`Order ${newOrder} created`);
      res.redirect("/my-profile/my-products");
    })
    .catch(error => {
      res.render("private/home");
      console.log(error);
    });
});

module.exports = router;
