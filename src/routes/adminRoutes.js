const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")

const controllersAdmin = require('../controllers/controllersAdmin');

router.get('/', controllersAdmin.home);
router.get('/create', controllersAdmin.create);
router.get('/detail/:id', controllersAdmin.show);
router.get('/edit/:id', controllersAdmin.edit);
router.get('/delete/:id', controllersAdmin.destroy);


module.exports = router;