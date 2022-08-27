const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
let db = require("../database/models")

const controllersAdmin = {
	home: (req, res) => {
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/administrar'), {productos});*/
        db.Productos.findAll()
            .then(Productos => {
                res.render(path.resolve(__dirname, '../views/admin/administrar'), {Productos: Productos})
            })
	},
    create: (req, res) => {
        db.Categoria.findAll()
            .then(Categorias => {
                res.render(path.resolve(__dirname, '../views/admin/create'), {Categorias: Categorias})
            })
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/create'), {productos});*/
	},
    save: (req, res) => {
        db.Productos.create({            
            Nombre : req.body.nombre,
            Descripcion: req.body.descripcion,
            idCategoria: req.body.categoria,
            Precio: req.body.precio,
            Descuento: req.body.descuento,
            Imagen: req.file.filename
        })
        /*Habría que ver de agregar las lineas de código de abajo. Es necesario implementar el then*/
        /*.then(confirmacion => {
            let response;
            if (confirmacion) {
                response = {
                    info: {
                        status: 200,
                        total: confirmacion.length,
                        url: "api/movies/create"
                    },
                    data: confirmacion
                }
            }
            else {
                response = {
                    info: {
                        status: 200,
                        total: confirmacion.length,
                        url: "api/movies/create"
                    },
                    data: confirmacion
                }
            }
            res.json(response)
        })*/

        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let ultimoProd = productos.pop();
        productos.push(ultimoProd);
        console.log(ultimoProd)
        let nuevoProducto = {
            id: ultimoProd.id +1,
            nombre : req.body.nombre,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            precio: req.body.precio,
            descuento: req.body.descuento,
            imagen: req.file.filename
        }
        productos.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(productos,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'), nuevoProductoGuardar);*/
        res.redirect('/administrar');
	},
    edit: (req, res) => {
        let Productos = db.Productos.findByPk(req.params.id, {include: [{association: 'Categoria'}]});
        let Categoria = db.Categoria.findAll();
        Promise.all([Productos, Categoria])
            .then(([Productos, Categoria]) => {
                return res.render(path.resolve(__dirname, '../views/admin/edit'), {Productos: Productos, Categoria:Categoria})
            })
            .catch(error => res.send(error));
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const prodId = req.params.id;
        let prodEditar = productos.find(prod=> prod.id == prodId);
		return res.render(path.resolve(__dirname, '../views/admin/edit'), {prodEditar});*/
	},
    update: (req, res) => {
        let Productos = {
            Nombre : req.body.nombre,
            Descripcion: req.body.descripcion,
            idCategoria: req.body.categoria,
            Precio: req.body.precio,
            Descuento: req.body.descuento,
            Imagen: req.body.imagen
        }
        db.Productos.update(Productos, {where:{idProducto: req.params.id}})
        res.redirect('/administrar')
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        let productosUpdate = productos.map(producto =>{
            if(producto.id == req.body.id){
                return producto = req.body;
            }
            return producto;
        })
        let productosActualizar = JSON.stringify(productosUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname,'../database/productos.json'),productosActualizar)
        res.redirect('/administrar');*/
        
    },
    show: (req, res) => {
        db.Productos.findByPk(req.params.id)
            .then(Productos => {
                res.render(path.resolve(__dirname, '../views/admin/detail'), {Productos: Productos})
            })
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                miProducto = producto;
            }
        });
		return res.render(path.resolve(__dirname, '../views/admin/detail'), {miProducto});*/
	},
    destroy: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const productoDeleteId = req.params.id;
        const productosFinal = productos.filter(producto => producto.id != productoDeleteId);
        let productosGuardar = JSON.stringify(productosFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'),productosGuardar);
        res.redirect('/administrar');
	},
    
}

module.exports = controllersAdmin;