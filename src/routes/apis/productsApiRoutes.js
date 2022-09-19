const express = require('express');
const router = express.Router();
const path = require("path")

const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/products/', productsAPIController.list)
router.get('/products/:id', productsAPIController.show)

module.exports = router;