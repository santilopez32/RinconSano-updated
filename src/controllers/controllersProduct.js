const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');

const controllersProduct = {
	productDetail: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productDetail'))
	},
    productCart: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productCart'));
	},
    products: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/products'));
	},
    addProduct: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/admin/addProduct'));
	},
    
}

module.exports = controllersProduct;