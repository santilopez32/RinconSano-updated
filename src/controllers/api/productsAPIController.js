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
            include : ['Categoria'], attributes: ['id', 'nombre', 'descripcion','id_categoria','precio','descuento','imagen']
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

                producto.dataValues.linkToImage = `http://localhost:3000/images/${producto.dataValues.imagen}`;

			let respuesta = {
                meta: {
                    status: 200,
                    total: producto.length,                    
                    url: '/api/products/:id'
                },
                data: producto,                
            }
            res.json(respuesta);
        
            })
            .catch(e=>{
                let response ={
                    info:{
                        status:404,
                        url: "api/productos/" + req.params.id
                    }
                }
            })			 
			},
            listCateg: (req, res) => {
                db.Categoria.findAll({include : ['Productos']})
                .then(categ=> {                    
                    let respuesta = {
                        meta: {
                            status : 200,                 
                            total: categ.length,                                                                                                
                            url: 'api/categ'
                        },
                        data:{                            
                            categ
                        } 
                    }
                    res.json(respuesta);
                                    
                    })	
                             
                },
    
    
}

module.exports = productsAPIController;