module.exports = (sequelize, DataType) => {
    const UsuarioAPP = sequelize.define('UsuariosAPP', {
        id_usuario_app:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false     
        },
        usuario: {
            type: DataType.STRING,
            allowNull: false        
        },        
        password: {
            type: DataType.TEXT,                  
            allowNull: true        
        },
        isLogged: {
            type: DataType.STRING,
            allowNull: false        
        },         
        image: {
            type: DataType.STRING,
            allowNull: false        
        },        
        institucion: {
            type: DataType.STRING,
            allowNull: false        
        },        
        cargo: {
            type: DataType.STRING,
            allowNull: false        
        },        
        token: {
            type: DataType.STRING,
            allowNull: false        
        },        
        status: {
            type: DataType.ENUM,
            values: ['1', '0'],
            allowNull: true     
        },
        createAt: {
            type: DataType.STRING,
            allowNull: false    
        },
    },{
        tableName: 'usuarios_app',
        timestamps: false
    });

    return UsuarioAPP;
}