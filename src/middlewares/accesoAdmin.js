function accesoAdmin(req, res, next) {
	if (req.session.userLogged.role !== 9) {
		return res.redirect('/home');
	}
	next();
}

module.exports = accesoAdmin;

