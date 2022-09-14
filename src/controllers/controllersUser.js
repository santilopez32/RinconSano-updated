const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs');
let db = require("../database/models")

const User = require('../models/User');

const controllersUser = {
	login: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/login'))
	},
	processLogin: (req, res) => {
		db.Usuarios.findOne({ where: { email: req.body.email}})
		.then((usuario) => {
		if(usuario){
			let isOkThePassword = bcrypt.compareSync(req.body.pass, usuario.password);
			if(isOkThePassword){
				delete usuario.password;
				req.session.userLogged = usuario;

				if(req.body.recordame){
					res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 60})
				}
				return res.redirect("../")
			}
			return res.render((path.resolve(__dirname, '../views/users/login')), {
				errors: {
					email: {
						msg: "Las credenciales son inválidas"
					}
				}
			})
		}
		})
		
	},
    register: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/register'));
	},
    processRegister: (req, res) => {
		const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/users/register')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else {
		db.Usuarios.create({            
            nombre: req.body.name,
			user: req.body.user,
			email: req.body.email,
			telefono: req.body.number,
			birthday: req.body.birth_date,
			domicilio: req.body.adress,
			ciudad: req.body.ciudad,				
			avatar:  req.file ? req.file.filename : '',
			password: bcrypt.hashSync(req.body.pass, 10),
			id_rol: 1
        })
        .then(Usuarios => {
            res.redirect('/user/login');
        })
	}

		/*const resultValidation = validationResult(req)
		if(resultValidation.errors.length > 0){
			return res.render((path.resolve(__dirname, '../views/users/register')), { 
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}  else { 
			let user = {
				name: req.body.name,
				user: req.body.user,
				email: req.body.email,
				telefono: req.body.number,
				nacimiento: req.body.birth_date,
				domicilio: req.body.adress,
				ciuidad: req.body.ciudad,				
				avatar:  req.file ? req.file.filename : '',
				password: bcrypt.hashSync(req.body.pass, 10),
				role: 1
			}
			let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), {
				encoding: 'utf-8'
			  });
			  let users;
			  //
			  if (archivoUsers == "") {
				users = [];
			  } else {
				users = JSON.parse(archivoUsers);
			  };
			  users.push(user);
			  usersJSON = JSON.stringify(users, null, 2);
			  fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), usersJSON);
			  res.redirect('/user/login');
      		  } */
		},
	store: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){

			let usersJSON = fs.readFileSync("users.json", { encoding : utf-8 }  )
			let users;
			if ( usersJSON == ""){
				users = [];
			} else {
				users = JSON.parse(usersJSON)
			}
		}
		return res.render(path.resolve(__dirname, '../views/users/register'));
	},
	profile: (req, res) => {
		return res.render(path.resolve(__dirname, '../views/users/profile'), {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
    editUser: (req, res) => {
        // let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]}); GUIA
		let Usuarios = db.Usuarios.findByPk(req.params.id);
        // let Categoria = db.Categoria.findAll();
        // Promise.all([Productos, Categoria])
		Promise.all([Usuarios])
            .then(([Usuarios]) => {
                // return res.render(path.resolve(__dirname, '../views/admin/edit'), {Productos: Productos, Categoria:Categoria})
				return res.render(path.resolve(__dirname, '../views/users/editUser'), {Usuarios: Usuarios})
            })
            .catch(error => res.send(error));
	},
    updateUser: (req, res) => {
        // const resultValidation = validationResult(req)
	// 	if(resultValidation.errors.length > 0){

    //         let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
    //         let Categoria = db.Categoria.findAll();
    //         Promise.all([Productos, Categoria])
    //         .then(([Productos, Categoria]) => {
    //             return res.render(path.resolve(__dirname, '../views/admin/edit'), {Productos: Productos, 
    //                 Categoria:Categoria, 
    //                 errors: resultValidation.mapped(),
    //                 oldData: req.body})
    //         })
	// 	}  else {
    //     let Productos = {
    //         nombre : req.body.nombre,
    //         descripcion: req.body.descripcion,
    //         id_categoria: req.body.categoria,
    //         precio: req.body.precio,
    //         descuento: req.body.descuento,
    //         imagen: req.body.imagen
    //     }
    //     db.Productos.update(Productos, {where:{id: req.params.id}})
    //     .then(Categorias => {
    //     res.redirect('/administrar')  
    //     })      
    // }
	let Usuarios = {
		        nombre : req.body.nombre,
		        user: req.body.user,
		        birthday: req.body.birthday,
		        domicilio: req.body.domicilio,
		        ciudad: req.body.ciudad,
		        avatar: req.body.avatar
		    }
		    db.Usuarios.update(Usuarios, {where:{id: req.params.id}})
		    .then(Categorias => {
		    res.redirect('/profile')  
		    })      
    },
}

module.exports = controllersUser;