module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
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
        user: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false
        },
       
        avatar: {
            type: dataTypes.STRING(255)
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        id_rol: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        domicilio: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        
        
    };
    let config = {
        tableName: 'Usuarios',
        timestamps: false
    };
    const Usuarios = sequelize.define(alias, cols, config);

    Usuarios.associate = function(models){
        Usuarios.hasMany(models.Compras,{
            as: "Compras",
            foreignKey:"id_usuario"
        })

        Usuarios.belongsTo(models.Rol,{
            as: "Rol",
            foreignKey:"id_rol"
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

    return Usuarios
}
