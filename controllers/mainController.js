const { validationResult } = require("express-validator")
const fs = require("fs")

const mainController = {
	home: (req, res) => {
		return res.render('home');
	},
    login: (req, res) => {
		return res.render('login');
	},
	processLogin: (req, res) => {
		let errors = validationResult(req)
		if(errors.isEmpty()){
			let usersJSON = fs.readFileSync("users.json", { encoding : utf-8 }  )
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
				return res.render("login", {errors: [{msg: "Credenciales inválidas"}]} )
			}
			req.session.usuarioLogueado = usuarioALoguearse;
			res.render("Success")
		} else {
			return res.render("login", {
				errors: errors.mapped(),
				oldData: req.body
			} )
		}
	},
    register: (req, res) => {
		return res.render('register');
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
		return res.render('register');
	},
    productDetail: (req, res) => {
		return res.render('productDetail');
	},
    productCart: (req, res) => {
		return res.render('productCart');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render("register", { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		return res.send("Las validaciones se superaron con creces!")
	}
}

module.exports = mainController;