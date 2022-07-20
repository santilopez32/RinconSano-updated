const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")

const mainController = {
	home: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/home'));
	},
    login: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/login'));
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
    productDetail: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productDetail'))
	},
    productCart: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/productCart'));
	},
	preguntasFrecuentes: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/preguntasFrecuentes'));
	},
	contact: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/contact'));
	},
	products: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/products/products'));
	},

	quienesSomos: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/quienesSomos'));
	},
	addProduct: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/admin/addProduct'));
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/users/register')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
		return res.send("Las validaciones se superaron con creces!")
	}
}

module.exports = mainController;