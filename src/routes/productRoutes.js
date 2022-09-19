const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")

const controllersProduct = require('../controllers/controllersProduct');

router.get('/api/products/', controllersProduct.list)
router.get('/api/products/:id', controllersProduct.show)

router.get('/Detail/:id', controllersProduct.productDetail)
router.get('/Cart', controllersProduct.productCart)
router.get('/products', controllersProduct.products)


module.exports = router;