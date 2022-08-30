const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const controllersProduct = {
	productDetail: (req, res) => {
        let productoEncontrado = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let categorias = db.Categoria.findAll();
        Promise.all([productoEncontrado, categorias])
            .then(([producto, categorias]) => {
                producto.categoria = categorias.find(cat => cat.id == producto.id_categoria)
                return res.render(path.resolve(__dirname, '../views/products/productDetail'), {producto})
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