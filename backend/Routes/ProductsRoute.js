const express = require('express');
const { getProduct, getProducts } = require('../controllers/productController');
const router = express();

router.route('/').get(getProducts)
router.route('/:id').get(getProduct)

module.exports = router;