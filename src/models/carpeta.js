module.exports = (sequelize, DataType) => {
    const Carpeta = sequelize.define('Carpeta',{
        nuc:{
            type: DataType.STRING,
            primaryKey: true,
        },
        isOpen:{
            type: DataType.STRING,
            allowNull: false
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
        inicio: {
            type: DataType.STRING,
            allowNull: false
        },
        folio: {
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