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

const validationsAdminCreate = [
    body("nombre")
        .notEmpty().withMessage("Ingresa el nombre del producto")
        .isLength({min: 8}).withMessage("El nombre, debe tener al menos 5 caracteres"),
    body("descripcion")
        .notEmpty().withMessage("Ingresa una descripción")
        .isLength({min: 20}).withMessage("La descripción debe tener al menos 20 caracteres"),
    body("categoria")
        .notEmpty().withMessage("Selecciona una categoría"),
    body("precio").notEmpty().withMessage("Ingresa el precio del producto"),
    body("descuento").notEmpty().withMessage("Recuerda colocar el descuento"),
    body("imagen").custom((value, { req }) => {
        let file = req.file
        let acceptedExtensions = [ ".jpg", ".gif", ".png", ".jpeg"]
        
        if(!file){
            throw new Error("Tienes que subir una imagen") 
        } else{
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error("Las extensiones permitidas son jpeg, jpg, pdf y gif")
            }
        }
        
        return true
    })
]
const { BADFAMILY } = require('dns');


router.get('/', accesoAdmin, controllersAdmin.home);
router.get('/create', accesoAdmin, controllersAdmin.create);
router.post('/create', uploadFile.single('imagen'), validationsAdminCreate, controllersAdmin.save); //agregamos uploadFile con storage arriba
router.get('/detail/:id', accesoAdmin, controllersAdmin.show);
router.get('/edit/:id', accesoAdmin, controllersAdmin.edit);
router.post('/edit/:id', uploadFile.single('imagen'), validationsAdminCreate, controllersAdmin.update); //agregamos edit
router.get('/delete/:id', accesoAdmin, controllersAdmin.destroy);


module.exports = router;