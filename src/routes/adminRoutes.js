const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")

const controllersAdmin = require('../controllers/controllersAdmin');
const accesoAdmin = require("../middlewares/accesoAdmin")

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,path.resolve(__dirname,"../../public/images"))
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({ storage: storage })


router.get('/', accesoAdmin, controllersAdmin.home);
router.get('/create', accesoAdmin, controllersAdmin.create);
router.post('/create', uploadFile.single('imagen'), controllersAdmin.save); //agregamos uploadFile con storage arriba
router.get('/detail/:id', accesoAdmin, controllersAdmin.show);
router.get('/edit/:id', accesoAdmin, controllersAdmin.edit);
router.get('/delete/:id', accesoAdmin, controllersAdmin.destroy);


module.exports = router;