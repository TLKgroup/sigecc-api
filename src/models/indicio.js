module.exports = (sequelize, DataType) => {
    const Indicio = sequelize.define('Indicio',{
        id_indicio:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        identificacion:{
            type: DataType.STRING,
            allowNull: false
        },
        descripcion: {
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
        documentacion: {
            type: DataType.STRING,
            allowNull: false
        },
        recoleccion: {
            type: DataType.STRING,
            allowNull: false
        },
        embalaje: {
            type: DataType.STRING,
            allowNull: false
        },
        latitud: {
            type: DataType.STRING,
            allowNull: false
        },
        longitud: {
            type: DataType.STRING,
            allowNull: false
        },
        lugar: {
            type: DataType.STRING,
            allowNull: false
        },
        foto1: {
            type: DataType.STRING,
            allowNull: false
        },
        naturaleza: {
            type: DataType.STRING,
            allowNull: false
        },
        nombreUsuario: {
            type: DataType.STRING,
            allowNull: false
        },
        usuario: {
            type: DataType.STRING,
            allowNull: false
        },
        foto2: {
            type: DataType.STRING,
            allowNull: false
        },
        smart_tag: {
            type: DataType.STRING,
            allowNull: false
        },
        nuc: {
            type: DataType.STRING,
            allowNull: false
        },
        escrito: {
            type: DataType.STRING,
            allowNull: false
        },
        fotografico: {
            type: DataType.STRING,
            allowNull: false
        },
        croquis: {
            type: DataType.STRING,
            allowNull: false
        },
        otro: {
            type: DataType.STRING,
            allowNull: false
        },
        especifique: {
            type: DataType.STRING,
            allowNull: false
        },
        entregado: {
            type: DataType.STRING,
            allowNull: false
        },
        estado: {
            type: DataType.STRING,
            allowNull: false
        }
    }, 
    {
        tableName: 'indicio',        
        timestamps: false
    });

    Indicio.associate = (models) => {

        Indicio.belongsTo(models.Carpeta, {
            foreignKey: 'nuc',
            targetKey: 'nuc'
        });
    }

    return Indicio;
}