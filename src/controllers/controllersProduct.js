const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const controllersProduct = {
	productDetail: (req, res) => {
		let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProd;
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                miProd = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {miProd})
	},
    productCart: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productCart'));
	},
    products: (req, res) => {
		/*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/products/products'), {productos});*/
        db.Productos.findAll()
            .then(Productos => {
                res.render(path.resolve(__dirname, '../views/products/products'), {Productos: Productos})
            })
	},
    
    
}

module.exports = controllersProduct;