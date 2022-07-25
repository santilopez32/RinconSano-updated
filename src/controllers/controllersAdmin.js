const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")

const controllersAdmin = {
	home: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/administrar'), {productos});
	},
    create: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/create'), {productos});
	},
    edit: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const prodId = req.params.id;
        let prodEditar = productos.find(prod=> prod.id == prodId);
		return res.render(path.resolve(__dirname, '../views/admin/edit'), {prodEditar});
	},
    show: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                miProducto = producto;
            }
        });
		return res.render(path.resolve(__dirname, '../views/admin/detail'), {miProducto});
	},
    destroy: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/administrar'), {productos});
	},
    
}

module.exports = controllersAdmin;