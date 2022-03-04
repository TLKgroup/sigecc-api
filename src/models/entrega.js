module.exports = (sequelize, DataType) => {
    const Entrega = sequelize.define('Entrega',{
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
        lugarentrega: {
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
        embalaje: {
            type: DataType.STRING,
            allowNull: false
        },
        nombreentrega: {
            type: DataType.STRING,
            allowNull: false
        },
        nombrerecibe: {
            type: DataType.STRING,
            allowNull: false
        },
        institucionentrega: {
            type: DataType.STRING,
            allowNull: false
        },
        institucionrecibe: {
            type: DataType.STRING,
            allowNull: false
        },
        cargoentrega: {
            type: DataType.STRING,
            allowNull: false
        },
        cargorecibe: {
            type: DataType.STRING,
            allowNull: false
        },
        firmaentrega: {
            type: DataType.STRING,
            allowNull: false
        },
        firmarecibe: {
            type: DataType.STRING,
            allowNull: false
        },
        naturaleza: {
            type: DataType.STRING,
            allowNull: false
        },
        indicio: {
            type: DataType.STRING,
            allowNull: false
        },
        observacion: {
            type: DataType.STRING,
            allowNull: false
        },
        permanencia: {
            type: DataType.STRING,
            allowNull: false
        },
        proposito: {
            type: DataType.STRING,
            allowNull: false
        },
    }, 
    {
        tableName: 'entrega',        
        timestamps: false
    });

    return Entrega;

}