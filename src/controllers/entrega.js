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
            naturaleza: req.body.naturaleza
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
                'naturaleza'
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

    return app;
}