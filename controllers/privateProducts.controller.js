const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

const home = (req, res) => {
  res.render("private/home");
};

const showProducts = async (req, res) => {
  const userId = req.session.currentUser._id;
  const usersProducts = [];

  try {
    const products = await Product.find();

    for (let i = 0; i < products.length; i++) {
      if (products[i].user != userId) {
        usersProducts.push(products[i]);
      }
    }

    const filteredProducts = usersProducts.filter(
      product => product.status === "Disponível"
    );

    res.render("private/home-products", { filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

const filteredProducts = async (req, res) => {
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

    res.render("private/filtered-products", { products: filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

const userProductDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    const user = await User.findById(product.user);

    const productUser = Object.assign({}, user, { product: product });

    res.render("private/products-details", productUser);
  } catch (error) {
    console.log(error);
  }
};

const myProducts = async (req, res, next) => {
  const userId = req.session.currentUser._id;

  try {
    const products = await Product.find({ user: userId });

    const filteredProducts = products.filter(
      product => product.status === "Disponível"
    );
    res.render("private/my-products", { filteredProducts });
  } catch (error) {
    console.log(error);
  }
};

const pendingProducts = async (req, res, next) => {
  const currentUser = req.session.currentUser._id;

  try {
    const orders = await Order.find({
      myUser: currentUser
    })
      .populate("userProducts")
      .populate("myProducts")
      .populate("myUser");

    const filteredOrders = orders.filter(order => order.accept === false);

    res.render("private/pending", { filteredOrders });
  } catch (error) {
    console.log(error);
  }
};

const insertProduct = (req, res, next) => {
  res.render("private/insertProduct");
};

const insertProductPost = async (req, res, next) => {
  const { name, description, quantity, category, user } = req.body;
  const imageUrl = req.file.url;

  const newProduct = new Product({
    name,
    description,
    quantity,
    category,
    user: req.session.currentUser._id,
    imageUrl
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
};

const myProductsDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/my-products-details", product);
  } catch (error) {
    console.log(error);
  }
};

const deleteMyProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.redirect("/my-profile/my-products");
  } catch (error) {
    console.log(error);
  }
};

const editMyProducts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.render("private/edit-product", product);
  } catch (error) {
    console.log(error);
  }
};

const editMyProductsPost = async (req, res, next) => {
  const { id } = req.params;
  const product = req.body;
  try {
    await Product.findByIdAndUpdate(id, product);
    res.redirect("/my-profile/my-products");
  } catch (error) {
    console.log(error);
    error;
  }
};

module.exports = {
  home,
  showProducts,
  filteredProducts,
  userProductDetails,
  myProducts,
  pendingProducts,
  insertProduct,
  insertProductPost,
  myProductsDetails,
  deleteMyProduct,
  editMyProducts,
  editMyProductsPost
};
