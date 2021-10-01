module.exports = (sequelize, DataType) => {
    const Carpeta = sequelize.define('Carpeta',{
        nuc:{
            type: DataType.STRING,
            primaryKey: true,
        },
        horaIntervencion:{
            type: DataType.STRING,
            allowNull: false
        },
        fechaIntervencion: {
            type: DataType.STRING,
            allowNull: false
        },
        lugar: {
            type: DataType.STRING,
            allowNull: false
        },
        institucion: {
            type: DataType.STRING,
            allowNull: false
        },
        nc: {
            type: DataType.STRING,
            allowNull: false
        },
    }, 
    {
        tableName: 'carpeta',        
        timestamps: false
    });

    return Carpeta;
}