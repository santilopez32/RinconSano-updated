const User = require('../models/User');
let db = require("../database/models")

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;

	let emailInCookie = req.cookies.userEmail;
	/*let userFromCookie = User.findByField('email', emailInCookie);*/
	

	if (emailInCookie) {
		db.Usuarios.findOne({ where: { email: emailInCookie}})
		.then((usuario) => {
			delete usuario.password
			req.session.userLogged = usuario;
		})
		
	}

	if (req.session.userLogged) {
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = userLoggedMiddleware;