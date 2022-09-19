const express = require('express');
const router = express.Router();
const path = require("path")


const usersAPIController = require('../../controllers/api/usersAPIController');

router.get('/users/', usersAPIController.list)
router.get('/users/:id', usersAPIController.show)


module.exports = router;