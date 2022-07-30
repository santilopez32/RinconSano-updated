const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');

const controllersUser = {
	login: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/login'));
	},
	processLogin: (req, res) => {
		let errors = validationResult(req)
		if(errors.isEmpty()){
			let usersJSON = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), { encoding : utf-8 }  )
			let users;
			if ( usersJSON == ""){
				users = [];
			} else {
				users = JSON.parse(usersJSON)
			}

			for( let i = 0; i < users.length; i++){
				if(users[i].email == req.body.email){
					if(bcrypt.compareSync(req.body.pass, users[i].pass)){
						let usuarioALoguearse = users[i];
						break;
					}
				}
			}
			if(usuarioALoguearse == undefined){
				return res.render((path.resolve(__dirname, '../views/users/login')), {errors: [{msg: "Credenciales inválidas"}]} )
			}
			req.session.usuarioLogueado = usuarioALoguearse;
			if(req.body.recordame != undefined){
				res.cookie("recordame", usuarioALoguearse.email, { maxAge: 60000})
			}
			res.render("Success")
		} else {
			return res.render((path.resolve(__dirname, '../views/users/login')), {
				errors: errors.mapped(),
				oldData: req.body
			} )
		}
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
		} else { 
			let user = {
				name: req.body.name,
				user: req.body.user,
				email: req.body.email,
				telefono: req.body.number,
				nacimiento: req.body.birth_date,
				domicilio: req.body.adress,
				perfilUser: req.body.profile,
				ciuidad: req.body.ciudad,
				descripcion: req.body.descripcion,				
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
    
}

module.exports = controllersUser;