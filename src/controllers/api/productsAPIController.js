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
            const reducer = (map, val) => {
                if (map[val] == null) {
                map[val] = 1;
                } else {
                ++map[val];
                }
                return map;}
			let respuesta = {
                meta: {
                    status : 200,                 
                    total: productos.length,                                                                                                
                    url: 'api/products'
                },
                data:{
                    countByCategory: productos.map(categ => categ.id_categoria).reduce(reducer, {}),
                    productos
                } 
            }
			res.json(respuesta);
            				
			})	
				     
		},
		show: (req, res) => {
			db.Productos.findByPk(req.params.id, {
                include : ['Categoria']
            })
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