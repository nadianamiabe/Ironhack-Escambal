const bcrypt = require("bcryptjs");
const User = require("../models/User");

const saltRounds = 10;

const getSignUp = (req, res) => {
  res.render("public/signup");
};

const postSignup = async (req, res) => {
  const {
    name,
    email,
    password,
    cpf,
    phoneNumber,
    state,
    city,
    road,
    complement,
    cep,
    number
  } = req.body;

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    cpf === "" ||
    phoneNumber === "" ||
    state === "" ||
    city === "" ||
    road === "" ||
    cep === "" ||
    number === ""
  ) {
    res.render("public/signup", {
      erroMessage: "Por favor, preencha todos os campos."
    });
    return;
  }

  const user = await User.findOne({ email });

  if (user) {
    res.render("public/signup", {
      errorMessage: "Este email já está registrado."
    });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const address = {
    state,
    city,
    road,
    number,
    cep,
    complement
  };

  const newUser = new User({
    name,
    email,
    password: hash,
    cpf,
    phoneNumber,
    address
  });

  try {
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getLogin = (req, res) => {
  res.render("public/login");
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.render("public/login", {
      errorMessage: "Por favor, verifique seu email ou senha."
    });
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.render("public/login", {
      errorMessage: "O usuário não foi encontrado."
    });
    return;
  }
  if (bcrypt.compareSync(password, user.password)) {
    req.session.currentUser = user;
    res.redirect("/home");
  } else {
    res.render("public/login", { errorMessage: "Senha incorreta." });
  }
};

const getLogout = (req, res) => {
  req.session.destroy(error => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/login");
    }
  });
};

module.exports = {
  getSignUp,
  postSignup,
  getLogin,
  postLogin,
  getLogout
};
