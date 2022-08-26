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
        Descripción: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        idCategoría: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        Precio: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        Descuento: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        }
    };
    let config = {
        tableName: 'Productos',
        timestamps: false
    };
    const Productos = sequelize.define(alias, cols, config);

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
