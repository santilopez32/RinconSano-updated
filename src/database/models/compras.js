module.exports = (sequelize, dataTypes) => {
    let alias = 'Compras';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: dataTypes.DATE,
            allowNull: false
        },
        // idEstado: {
        //     type: dataTypes.INTEGER,
        //     allowNull: false
        // },
        
    };
    let config = {
        tableName: 'Compras',
        timestamps: false
    };
    const Compras = sequelize.define(alias, cols, config);


    Compras.associate = function(models){
        Compras.belongsToMany(models.Productos,{
            as: "Productos",
            through: "CompraProducto",
            foreignKey: "id_compra",
            otherKey: "id_producto",
            timestamps: false,
        })
        Compras.belongsTo(models.Estado,{
            as: "Estado",
            foreignKey:"id_estado"
        })    
        Compras.belongsTo(models.Usuarios,{
            as: "Usuarios",
            foreignKey:"id_usuario"
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
    return Compras
    }

    