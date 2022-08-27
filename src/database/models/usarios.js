module.exports = (sequelize, dataTypes) => {
    let alias = 'Usuarios';
    let cols = {
        idUsuario: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        User: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Birthday: {
            type: dataTypes.DATE,
            allowNull: false
        },
       
        Avatar: {
            type: dataTypes.STRING(255)
        },
        Password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        idRol: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Domicilio: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        Ciudad: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        
        
        
    };
    let config = {
        tableName: 'Usuarios',
        timestamps: false
    };
    const Usuarios = sequelize.define(alias, cols, config);

    /*Actor.associate = function(models) {

        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie", /// Tabla intermedia 
            foreignKey: "actor_id", /// Es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "movie_id", /// Es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
        })*/

    }

    return Usuarios