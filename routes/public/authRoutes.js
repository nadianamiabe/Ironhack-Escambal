const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const router = express.Router();
const saltRounds = 10;

router.get('/signup', (req, res) => {
  res.render('public/signup');
});

router.post('/signup', async (req, res) => {
  const {
    name, email, password, city, cpf, phoneNumber, adress,
  } = req.body;
  if (
    name === ''
    || email === ''
    || password === ''
    || city === ''
    || cpf === ''
    || phoneNumber === ''
    || adress === ''
  ) {
    res.render('public/signup', { erroMessage: 'Por favor, preencha todos os campos.' });
    return;
  }

  const user = await User.findOne({ email });
  if (user) {
    res.render('public/signup', { errorMessage: 'Este email já está registrado.' });
  }
  // if (user.cpf) {
  //   res.render('public/signup', { errorMessage: 'Este CPF já está registrado.' });
  // }

  // const x = await User.findOne({ cpf });
  // if (x) {
  //   res.render('public/signup', { errorMessage: 'Este CPF já está registrado.' });
  // }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({
    name,
    email,
    password: hash,
    city,
    cpf,
    phoneNumber,
    adress,
  });

  try {
    await newUser.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => {
  res.render('public/login');
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('public/login', {
      errorMessage: 'Por favor, verifique seu email ou senha.',
    });
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.render('public/login', { errorMessage: 'O usuário não foi encontrado.' });
    return;
  }
  if (bcrypt.compareSync(password, user.password)) {
    req.session.currentUser = user;
    res.redirect('/');
  } else {
    res.render('public/login', { errorMessage: 'Senha incorreta.' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
