const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  console.log('caiu na rota /');
  res.render('public/index');
});

router.get('/home', (req, res) => {
  res.render('public/home');
});

module.exports = router;
