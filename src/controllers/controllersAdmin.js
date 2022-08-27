const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
let db = require("../database/models")

const controllersAdmin = {
	home: (req, res) => {
        db.Productos.findAll()
            .then(Productos => {
                res.render(path.resolve(__dirname, '../views/admin/administrar'), {Productos: Productos})
            })
	},
    create: (req, res) => {
        db.Categoria.findAll()
            .then(Categorias => {
                res.render(path.resolve(__dirname, '../views/admin/create'), {Categorias: Categorias})
            })
	},
    save: (req, res) => {
        db.Productos.create({            
            Nombre : req.body.nombre,
            Descripcion: req.body.descripcion,
            idCategoria: req.body.categoria,
            Precio: req.body.precio,
            Descuento: req.body.descuento,
            Imagen: req.file.filename
        })
        res.redirect('/administrar');
	},
    edit: (req, res) => {
        let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let Categoria = db.Categoria.findAll();
        Promise.all([Productos, Categoria])
            .then(([Productos, Categoria]) => {
                return res.render(path.resolve(__dirname, '../views/admin/edit'), {Productos: Productos, Categoria:Categoria})
            })
            .catch(error => res.send(error));
	},
    update: (req, res) => {
        let Productos = {
            Nombre : req.body.nombre,
            Descripcion: req.body.descripcion,
            idCategoria: req.body.categoria,
            Precio: req.body.precio,
            Descuento: req.body.descuento,
            Imagen: req.body.imagen
        }
        db.Productos.update(Productos, {where:{idProducto: req.params.id}})
        res.redirect('/administrar')        
    },
    show: (req, res) => {
        let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let Categoria = db.Categoria.findByPk(req.params.id);
        Promise.all([Productos, Categoria])
            .then(([Productos, Categoria]) => {
                return res.render(path.resolve(__dirname, '../views/admin/detail'), {Productos: Productos, Categoria:Categoria})
            })
            .catch(error => res.send(error));
	},
    destroy: (req, res) => {

        db.Productos.destroy({where:{idProducto: req.params.id}})
        res.redirect('/administrar')

        
	},
    
}

module.exports = controllersAdmin;