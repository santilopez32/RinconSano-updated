const categoria = require("./categoria");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        idProducto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Descripcion: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        idCategoria: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        Precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        Descuento: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        Imagen: {
            type: dataTypes.STRING(255)
        }
    };
    let config = {
        tableName: 'Productos',
        timestamps: false
    };
    const Productos = sequelize.define(alias, cols, config);

    Productos.associate = function(models){
        Productos.belongsTo(models.Categoria,{
            as: "Categoria",
            foreignKey:"idProductos"
        })
    }

    Productos.associate = function(models){
        Productos.belongsToMany(models.Compras,{
            as: "Compras",
            through: "ComprasPeliculas",
            foreignKey: "idProductos",
            otherKey: "idCompras",
            timestamps: false,
        })
    }    
    /*Actor.associate = function(models) {

        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie", /// Tabla intermedia 
            foreignKey: "actor_id", /// Es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "movie_id", /// Es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
        })*/

    }

    return Productos
