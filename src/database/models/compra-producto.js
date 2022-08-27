module.exports = (sequelize, dataTypes) => {
    let alias = 'CompraProducto';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCompra: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        idProducto: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        Cantidad: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };
    let config = {
        tableName: 'CompraProducto',
        timestamps: false
    };
    const CompraProducto = sequelize.define(alias, cols, config);

    /*Actor.associate = function(models) {

        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie", /// Tabla intermedia 
            foreignKey: "actor_id", /// Es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "movie_id", /// Es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
        })*/

    }

    return CompraProducto