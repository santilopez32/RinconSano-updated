const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")

const { body } = require("express-validator")

const mainController = require('../controllers/mainController');

//Rutas traidas
router.get('/home', mainController.home)
router.get('/preguntasFrecuentes', mainController.preguntasFrecuentes)
router.get('/contact', mainController.contact)
router.get('/quienesSomos', mainController.quienesSomos)


module.exports = router;