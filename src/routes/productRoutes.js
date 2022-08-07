const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")

const controllersProduct = require('../controllers/controllersProduct');

router.get('/Detail/:id', controllersProduct.productDetail)
router.get('/Cart', controllersProduct.productCart)
router.get('/add', controllersProduct.addProduct)
router.get('/products', controllersProduct.products)


module.exports = router;