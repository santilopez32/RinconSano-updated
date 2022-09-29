function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {	
		return res.redirect(`/user/profile/${req.session.userLogged.id}`);
	}
	next();
}

module.exports = guestMiddleware;