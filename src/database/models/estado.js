module.exports = (sequelize, dataTypes) => {
    let alias = 'Estado';
    let cols = {
        idEstado: {
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
        tableName: 'Estado',
        timestamps: false
    };
    const Estado = sequelize.define(alias, cols, config);

    Estado.associate = function(models){
        Estado.belongsTo(models.Productos,{
            as: "Productos",
            foreignKey:"idCategoria"
        })
    }

    Estado.associate = function(models){
        Estado.hasMany(models.Compras,{
            as: "Compras",
            foreignKey:"idEstado"
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

    return Estado