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
            .then(Categoria => {
                res.render(path.resolve(__dirname, '../views/admin/create'), {Categoria: Categoria})
            })
	},
    save: (req, res) => {
        const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/admin/create')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else {
        db.Productos.create({            
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            id_categoria: req.body.categoria,
            precio: req.body.precio,
            descuento: req.body.descuento,
            imagen: req.file ? req.file.filename : ''
        })
        .then(Categorias => {
            res.redirect('/administrar');
        })
        }
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
        const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/admin/edit')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else {
        let Productos = {
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            id_categoria: req.body.categoria,
            precio: req.body.precio,
            descuento: req.body.descuento,
            imagen: req.body.imagen
        }
        db.Productos.update(Productos, {where:{id: req.params.id}})
        .then(Categorias => {
        res.redirect('/administrar')  
        })      
    }
    },
    show: (req, res) => {
        let productoEncontrado = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let categorias = db.Categoria.findAll();
        Promise.all([productoEncontrado, categorias])
            .then(([producto, categorias]) => {
                producto.categoria = categorias.find(cat => cat.id == producto.id_categoria)
                return res.render(path.resolve(__dirname, '../views/admin/detail'), {producto})
            })
            .catch(error => res.send(error));
	},
    destroy: (req, res) => {

        db.Productos.destroy({where:{id: req.params.id}})
        res.redirect('/administrar')

        
	},
    
}

module.exports = controllersAdmin;