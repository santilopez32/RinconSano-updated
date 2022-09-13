const User = require('../models/User');
let db = require("../database/models")

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;
	const emailInCookie = req.cookies.userEmail;
	if(!req.session.userLogged){
		if(emailInCookie){
			db.Usuarios.findOne({ where: { email: emailInCookie}})
				.then((usuario) => {
					delete usuario.password
					req.session.userLogged = usuario;
					res.locals.isLogged = true;
					res.locals.userLogged = req.session.userLogged;
		})

		}

	} else {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;

	}
	next();

	
}

module.exports = userLoggedMiddleware;