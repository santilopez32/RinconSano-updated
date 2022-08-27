module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        idCategoria: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreCategoria: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    };
    let config = {
        tableName: 'Categoria',
        timestamps: false
    };
    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Productos,{
            as: "Productos",
            foreignKey:"idCategoria"
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

    return Categoria