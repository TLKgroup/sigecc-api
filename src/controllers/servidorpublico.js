const Sequelize = require('sequelize');

module.exports = app => {

    const ServidorPublico = app.database.models.ServidorPublico;
    
    app.addNewServidorPublico = (req, res) => {
        let folderServidorPublico = new ServidorPublico({
            nuc: req.body.nuc,
            folio: req.body.folio,
            idCarpeta: req.body.idCarpeta,
            fecha: req.body.fecha,
            hora: req.body.hora,
            nombre: req.body.nombre,
            institucion: req.body.institucion,
            cargo: req.body.cargo,
            etapa: req.body.etapa,
            firma: req.body.firma,
            via: req.body.via,
            condicionespecial: req.body.condicionespecial,
            recomendacion: req.body.recomendacion,
            identificador: req.body.identificador
        });        
        
        ServidorPublico.create(folderServidorPublico.dataValues, {
            fields: [
                'nuc',
                'folio',
                'idCarpeta',
                'fecha',
                'hora',
                'nombre',
                'institucion',
                'cargo',
                'etapa',
                'firma',
                'via',
                'condicionespecial',
                'recomendacion',
                'identificador'
            ]
        })
        .then(result => {                       
            res.json({
                OK: true,
                ServidorPublico: result
            });
        })
        .catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
        });        
    }


    app.getServidorPublicoXNUC = (req, res) => {
        let body = req.body;

        ServidorPublico.findAll({ 
            where:{
                nuc: body.nuc
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                Servidorpublico: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getServidorPublicoXIndicio = (req, res) => {
        let body = req.body;

        ServidorPublico.findAll({ 
            where:{
                nuc: body.nuc,
                identificador: body.identificador
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                Servidorpublico: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }
    
    return app;
}