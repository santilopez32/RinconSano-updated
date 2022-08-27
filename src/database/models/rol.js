module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        idRol: {
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
        }
    };
    let config = {
        tableName: 'Rol',
        timestamps: false
    };
    const Rol = sequelize.define(alias, cols, config);
    
    Rol.associate = function(models){
        Rol.hasMany(models.Usuarios,{
            as: "Usuarios",
            foreignKey:"idRol"
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

        return Rol
    }
