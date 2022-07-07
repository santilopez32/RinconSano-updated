const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")

const { body } = require("express-validator")

let guestMiddleware = require("../middlewares/guestMiddleware")
let authMiddleware = require("../middlewares/authMiddleware")

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,"./public/images/avatar")
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({ storage: storage })
const validations = [
    body("name").notEmpty().withMessage("Debes ingresar tu nombre"),
    body("user").notEmpty().withMessage("Te está faltando elegir tu usuario"),
    body("email")
        .notEmpty().withMessage("Seria genial que ingreses tu email").bail()
        .isEmail().withMessage("No es un correo electrónico válido"),
    body("phone").notEmpty().withMessage("Debes ingresar tu teléfono"),
    body("birth_date").notEmpty().withMessage("¿No quieres decirnos tu cumpleaños?"),
    body("adress").notEmpty().withMessage("¿Dónde vives?"),
    body("profile").notEmpty().withMessage("Recuerda elegir un perfil"),
    body("ciudad").notEmpty().withMessage("¿Y, eso en que provincia es?"),
    body("descripcion").notEmpty().withMessage("Vamos, cuentanos un poco.."),
    body("pass")
        .notEmpty().withMessage("Elige una contraseña").bail()
        .isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("pass_confirm").notEmpty().withMessage("Confirma tu contraseña"),
    body("avatar").custom((value, { req }) => {
        let file = req.file
        let acceptedExtensions = [ ".jpg", ".pdf", ".png"]
        
        if(!file){
            throw new Error("Tienes que subir una imagen") 
        } else{
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error("Las extensiones permitidas son jpeg, pdf y png")
            }
        }
        
        return true
    })
]

const mainController = require('../controllers/mainController');
const { BADFAMILY } = require('dns');
//Rutas traidas
router.get('/home', mainController.home)
router.get('/login', mainController.login)
router.post('/login', validations, mainController.processLogin)

//Ruta agregada probando login
router.get('/check', function(req,res){
    if (req.session.usuarioLogueado == undefined){
        res.send("No estás logueado")
    } else { "El usuario logueado es " + req.session.usuarioLogueado.email}
})
//Hasta aqui llega Ruta agregada probando login

router.get('/register', guestMiddleware, mainController.register)
router.post('/register', uploadFile.single("avatar"), validations, mainController.processRegister)
router.get('/productDetail', mainController.productDetail)
router.get('/productCart', mainController.productCart)
//Rutas traidas


module.exports = router;