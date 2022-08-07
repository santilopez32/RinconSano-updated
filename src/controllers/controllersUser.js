const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const controllersUser = {
	login: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/login'))
	},
	processLogin: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.pass, userToLogin.password);
			console.log(isOkThePassword)
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.recordame) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
				//Ver como carajo hacer para que te redirija a home
				return res.redirect('/home');
			}
			return res.render(path.resolve(__dirname, '../views/users/login'), {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render(path.resolve(__dirname, '../views/users/login'), {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
		
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
      		  } 
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
	profile: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/profile'), {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/home');
	}
    
}

module.exports = controllersUser;