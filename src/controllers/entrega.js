const Sequelize = require('sequelize');

module.exports = app => {

    const Entrega = app.database.models.Entrega;
    
    app.addNewEntrega = (req, res) => {
        let folderEntrega = new Entrega({
            nuc: req.body.nuc,
            folio: req.body.folio,
            lugarentrega: req.body.lugarentrega,
            hora: req.body.hora,
            fecha: req.body.fecha,
            embalaje: req.body.embalaje,
            nombreentrega: req.body.nombreentrega,
            nombrerecibe: req.body.nombrerecibe,
            institucionentrega: req.body.institucionentrega,
            institucionrecibe: req.body.institucionrecibe,
            cargoentrega: req.body.cargoentrega,
            cargorecibe: req.body.cargorecibe,
            firmaentrega: req.body.firmaentrega,
            firmarecibe: req.body.firmarecibe,
            naturaleza: quitarAcentos(req.body.naturaleza),
            clase: req.body.clase,
            observacion: req.body.observacion,
            permanencia: req.body.permanencia,
            proposito: req.body.proposito,
            propositorecibe: req.body.propositorecibe,
            identificadores: req.body.identificadores,
        });        
        
        Entrega.create(folderEntrega.dataValues, {
            fields: [
                'nuc',
                'folio',
                'lugarentrega',
                'hora',
                'fecha',
                'embalaje',
                'nombreentrega',
                'nombrerecibe',
                'institucionentrega',
                'institucionrecibe',
                'cargoentrega',
                'cargorecibe',
                'firmaentrega',
                'firmarecibe',
                'naturaleza',
                'clase',
                'observacion',
                'permanencia',
                'proposito',
                'propositorecibe',
                'identificadores',
            ]
        })
        .then(result => {                       
            res.json({
                OK: true,
                Entrega: result
            });
        })
        .catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
        });        
    }

    app.getEntregaXNUC = (req, res) => {
        let body = req.body;

        Entrega.findAll({ 
            where:{
                nuc: body.nuc
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                Entrega: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getEntregaXIndicioNUC = (req, res) => {
        let body = req.body;

        Entrega.findAll({ 
            where:{
                nuc: body.nuc,
                identificadores: body.identificadores,
            }
        })
        .then(result => {
            res.json({
                OK: true,
                EntregaXI: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    const quitarAcentos = (cadena) => {
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'n',"'":' ',"¿":' ',"?":' ','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','Ñ':'N'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    }

    return app;
}