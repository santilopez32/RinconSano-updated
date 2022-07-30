const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');

const mainController = {
	home: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/home'));
	},
	preguntasFrecuentes: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/preguntasFrecuentes'));
	},
	contact: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/contact'));
	},
	quienesSomos: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/web/quienesSomos'));
	},
	}


module.exports = mainController;