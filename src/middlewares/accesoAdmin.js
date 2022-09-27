function accesoAdmin(req, res, next) {
	if (!req.session.userLogged || req.session.userLogged.id_rol!== 2) {
		return res.redirect('/');
	}
	next();
}

module.exports = accesoAdmin;

