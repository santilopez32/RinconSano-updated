module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoría';
    let cols = {
        idCategoría: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'Categoría',
        timestamps: false
    };
    const Categoría = sequelize.define(alias, cols, config);

    /*Actor.associate = function(models) {

        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie", /// Tabla intermedia 
            foreignKey: "actor_id", /// Es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "movie_id", /// Es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
        })*/

    }

    return Categoría