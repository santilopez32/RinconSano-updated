const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../../database/models")

const User = require('../../models/User');

const usersAPIController = {
	list: (req, res) => {
		db.Usuarios.findAll({
            attributes: ['id', 'nombre', 'user','email','birthday','avatar','id_rol','domicilio','ciudad']
        })
		.then(usuarios=> {
            let respuesta = {
                meta: {
                    status : 200,
                    total: usuarios.length,
                    url: 'api/users'
                },
                data: usuarios
            }
			res.json(respuesta);				
			})						     
		},
		show: (req, res) => {
			db.Usuarios.findByPk(req.params.id, {
                attributes: ['id', 'nombre', 'user','email','birthday','avatar','id_rol','domicilio','ciudad']
            })
			.then(usuario=> {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        url: '/api/users/:id'
                    },
                    data: usuario,
                    url: 'localhost:3000/public/images/avatar/' + usuario.avatar
                }
				res.json(respuesta);
			})
						 
			},
}

module.exports = usersAPIController;