const categoria = require("./categoria");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Productos';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        descuento: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        imagen: {
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
            foreignKey:"id_categoria"
        })
    
        Productos.belongsToMany(models.Compras,{
            as: "Compras",
            through: "CompraProducto",
            foreignKey: "id_producto",
            otherKey: "id_compra",
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

        return Productos
    }

