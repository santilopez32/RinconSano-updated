module.exports = (sequelize, dataTypes) => {
    let alias = 'Estado';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
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
            foreignKey:"id_categoria"
        })
        Estado.hasMany(models.Compras,{
            as: "Compras",
            foreignKey:"id_estado"
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
        
        return Estado
    }
