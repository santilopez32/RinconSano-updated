const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../../database/models")
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const productsAPIController = {
    list: (req, res) => {
		db.Productos.findAll({
            include : ['Categoria']
        })
		.then(productos=> {
			let respuesta = {
                meta: {
                    status : 200,
                    count:{ 
                        total: productos.length,                                        
                        Granolas: db.Categoria.count(),
                        Orgánico: productos.length,
                        Libre_de_Gluten: productos.length,
                        Cosmética_Natural: productos.length,   
                    },         
                    url: 'api/products'
                },
                data: productos
            }
			res.json(respuesta);				
			})	
				     
		},
		show: (req, res) => {
			db.Productos.findByPk(req.params.id)
            .then(producto=> {
			let respuesta = {
                meta: {
                    status: 200,
                    total: producto.length,                    
                    url: '/api/products/:id'
                },
                data: producto
            }
            res.json(respuesta);
        
            })			 
			},
    
    
}

module.exports = productsAPIController;