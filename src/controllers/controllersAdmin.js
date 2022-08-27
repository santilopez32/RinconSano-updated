const { validationResult } = require("express-validator")
const fs = require("fs")
const path = require("path")
let db = require("../database/models")

const controllersAdmin = {
	home: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
		return res.render(path.resolve(__dirname, '../views/admin/administrar'), {productos});
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
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const prodId = req.params.id;
        let prodEditar = productos.find(prod=> prod.id == prodId);
		return res.render(path.resolve(__dirname, '../views/admin/edit'), {prodEditar});
	},
    update: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
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
        res.redirect('/administrar');
        /*let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const prodId = req.params.id;
        let prodEditar = productos.find(prod=> prod.id == prodId);
		return res.render(path.resolve(__dirname, '../views/admin/edit'), {prodEditar});*/
    },
    show: (req, res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProducto;
        productos.forEach(producto => {
            if(producto.id == req.params.id){
                miProducto = producto;
            }
        });
		return res.render(path.resolve(__dirname, '../views/admin/detail'), {miProducto});
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