const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")

const controllersAdmin = require('../controllers/controllersAdmin');
const accesoAdmin = require("../middlewares/accesoAdmin")


router.get('/', accesoAdmin, controllersAdmin.home);
router.get('/create', accesoAdmin, controllersAdmin.create);
router.get('/detail/:id', accesoAdmin, controllersAdmin.show);
router.get('/edit/:id', accesoAdmin, controllersAdmin.edit);
router.get('/delete/:id', accesoAdmin, controllersAdmin.destroy);


module.exports = router;