const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const controllersProduct = {
	productDetail: (req, res) => {
		/*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProd;
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                miProd = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/products/productDetail'), {miProd})*/
        let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let Categoria = db.Categoria.findByPk(req.params.id);
        Promise.all([Productos, Categoria])
            .then(([Productos, Categoria]) => {
                return res.render(path.resolve(__dirname, '../views/products/productDetail'), {Productos: Productos, Categoria:Categoria})
            })
            .catch(error => res.send(error));
	},
    productCart: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productCart'));
	},
    products: (req, res) => {
        db.Productos.findAll()
            .then(Productos => {
                res.render(path.resolve(__dirname, '../views/products/products'), {Productos: Productos})
            })
	},
    
    
}

module.exports = controllersProduct;