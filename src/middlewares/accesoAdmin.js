function accesoAdmin(req, res, next) {
	if (req.session.userLogged.id_rol !== 2) {
		return res.redirect('/home');
	}
	next();
}

module.exports = accesoAdmin;

