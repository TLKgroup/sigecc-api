module.exports = (sequelize, DataType) => {
    const ServidorPublico = sequelize.define('ServidorPublico',{
        id_entrega:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nuc:{
            type: DataType.STRING,
            allowNull: false
        },
        folio: {
            type: DataType.STRING,
            allowNull: false
        },
        idCarpeta: {
            type: DataType.STRING,
            allowNull: false
        },
        fecha: {
            type: DataType.STRING,
            allowNull: false
        },
        hora: {
            type: DataType.STRING,
            allowNull: false
        },
        nombre: {
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
        etapa: {
            type: DataType.STRING,
            allowNull: false
        },
        firma: {
            type: DataType.STRING,
            allowNull: false
        },
        via: {
            type: DataType.STRING,
            allowNull: false
        },
        condicionespecial: {
            type: DataType.STRING,
            allowNull: false
        },
        recomendacion: {
            type: DataType.STRING,
            allowNull: false
        },
        identificador: {
            type: DataType.STRING,
            allowNull: false
        },
    }, 
    {
        tableName: 'servidorpublico',        
        timestamps: false
    });

    return ServidorPublico;
}