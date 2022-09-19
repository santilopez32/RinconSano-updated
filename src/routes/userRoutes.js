const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { body } = require("express-validator")


let guestMiddleware = require("../middlewares/guestMiddleware")
let authMiddleware = require("../middlewares/authMiddleware")

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null,path.resolve(__dirname,"../../public/images/avatar"))
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
    body("ciudad").notEmpty().withMessage("¿Y, eso en que provincia es?"),
    body("pass")
        .notEmpty().withMessage("Elige una contraseña").bail()
        .isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("pass_confirm").notEmpty().withMessage("Confirma tu contraseña"),
    body("avatar").custom((value, { req }) => {
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

const controllersUser = require('../controllers/controllersUser');

router.get('/api/users/', controllersUser.list)
router.get('/api/users/:id', controllersUser.show)

router.get('/login', guestMiddleware, controllersUser.login)
router.post('/login', validations, controllersUser.processLogin)
router.get('/register', guestMiddleware, controllersUser.register)
router.post('/register', uploadFile.single("avatar"), validations, controllersUser.processRegister)
router.get('/profile/:id', authMiddleware, controllersUser.profile);
router.get('/logout', controllersUser.logout);

// router.get('/edit/:id', accesoAdmin, controllersAdmin.edit);
router.get('/editUser/:id', controllersUser.editUser)
// router.post('/edit/:id', uploadFile.single('imagen'), validationsAdminCreate, controllersAdmin.update);
router.post('/editUser/:id', uploadFile.single('avatar'), controllersUser.updateUser)
router.get('/check', function(req,res){
    if (req.session.usuarioLogueado == undefined){
        res.send("No estás logueado")
    } else { "El usuario logueado es " + req.session.usuarioLogueado.email}
})


module.exports = router;