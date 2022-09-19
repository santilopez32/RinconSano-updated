const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../../database/models")

const User = require('../../models/User');

const usersAPIController = {
	list: (req, res) => {
		db.Usuarios.findAll()
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
			db.Usuarios.findByPk(req.params.id)
			.then(usuario=> {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: usuario.length,
                        url: '/api/users/:id'
                    },
                    data: usuario
                }
				res.json(respuesta);
			})
						 
			},
}

module.exports = usersAPIController;