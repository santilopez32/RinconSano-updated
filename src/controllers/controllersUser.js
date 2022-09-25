const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const User = require('../models/User');

const controllersUser = {
	login: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/login'))
	},
	processLogin: (req, res) => {
		db.Usuarios.findOne({ where: { email: req.body.email}})
		.then((usuario) => {		
		if(usuario){
			let isOkThePassword = bcrypt.compareSync(req.body.pass, usuario.password);
			if(isOkThePassword){
				delete usuario.password;
				req.session.userLogged = usuario;
				res.cookie("userEmail", req.body.email, { maxAge: 300 * 60 * 60})
				if(req.body.recordame){
					res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60})
				}
				res.redirect("../")
			} else {
			return res.render((path.resolve(__dirname, '../views/users/login')), {
				errors: {
					email: {
						msg: "Las credenciales son inválidas"
					}
				}
			})
		}
		}
		else {
			return res.render((path.resolve(__dirname, '../views/users/login')), {
			  errors: {
				email: {
				  msg: "Las credenciales son inválidas"
				}
			  }
			})
		  }})		
		
	},
    register: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/register'));
	},
    processRegister: (req, res) => {
		const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/users/register')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else {
		db.Usuarios.create({            
            nombre: req.body.name,
			user: req.body.user,
			email: req.body.email,
			telefono: req.body.number,
			birthday: req.body.birth_date,
			domicilio: req.body.adress,
			ciudad: req.body.ciudad,				
			avatar:  req.file ? req.file.filename : '',
			password: bcrypt.hashSync(req.body.pass, 10),
			id_rol: 1
        })
        .then(Usuarios => {
            res.redirect('/user/login');
        })
	}

		/*const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/users/register')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else { 
			let user = {
				name: req.body.name,
				user: req.body.user,
				email: req.body.email,
				telefono: req.body.number,
				nacimiento: req.body.birth_date,
				domicilio: req.body.adress,
				ciuidad: req.body.ciudad,				
				avatar:  req.file ? req.file.filename : '',
				password: bcrypt.hashSync(req.body.pass, 10),
				role: 1
			}
			let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), {
				encoding: 'utf-8'
			  });
			  let users;
			  //
			  if (archivoUsers == "") {
				users = [];
			  } else {
				users = JSON.parse(archivoUsers);
			  };
			  users.push(user);
			  usersJSON = JSON.stringify(users, null, 2);
			  fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), usersJSON);
			  res.redirect('/user/login');
      		  } */
		},
	store: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){

			let usersJSON = fs.readFileSync("users.json", { encoding : utf-8 }  )
			let users;
			if ( usersJSON == ""){
				users = [];
			} else {
				users = JSON.parse(usersJSON)
			}
		}
		return res.render(path.resolve(__dirname, '../views/users/register'));
	},
	// profile: (req, res) => {
	// 	return res.render(path.resolve(__dirname, '../views/users/profile'), {
	// 		user: req.session.userLogged
	// 	});
	// },

	profile: (req, res) => {
		db.Usuarios.findByPk(req.params.id)	
            .then((Usuarios) => {
				return res.render(path.resolve(__dirname, '../views/users/profile'), {Usuarios: Usuarios})
            })
            .catch(error => res.send(error));
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
    editUser: (req, res) => {
		db.Usuarios.findByPk(req.params.id)	
            .then((Usuarios) => {
				return res.render(path.resolve(__dirname, '../views/users/editUser'), {Usuarios: Usuarios})
            })
            .catch(error => res.send(error));
	},
    updateUser: (req, res) => {
	let Usuarios = {
		        nombre : req.body.nombre,
		        user: req.body.user,		        
		        domicilio: req.body.domicilio,
		        avatar: req.body.avatar
		    }
		    db.Usuarios.update(Usuarios, {where:{id: req.params.id}})
		    .then(Usuarios => {
		    res.redirect('/user/profile')  
		    })      
    },
	list: (req, res) => {
		db.Usuarios.findAll()
		.then(usuarios=> {
			return res.status(200).json({
				total: usuarios.length,
				data: usuarios,
				status: 200
			})
		})
				     
		},
		show: (req, res) => {
			db.Usuarios.findByPk(req.params.id)
			.then(usuario=> {
				return res.status(200).json({				
					data: usuario,
					status: 200
				})
			})
						 
			},
}

module.exports = controllersUser;