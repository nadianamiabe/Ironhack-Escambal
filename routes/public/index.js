const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  res.render('public/index');
});

router.get('/about', (req, res) => {
  res.render('public/about');
});

router.get('/categories', (req, res) => {
  res.render('public/categories');
});

router.get('/categories/products', (req, res) => {
  res.render('public/products');
});
module.exports = router;
