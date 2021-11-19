const Sequelize = require('sequelize');

module.exports = app => {

    const Op = Sequelize.Op;
    const Carpeta = app.database.models.Carpeta;

    app.addNewFolder = (req, res) => {
        let folder = new Carpeta({ 
            nuc: req.body.nuc,     
            isOpen: 'true',     
            horaIntervencion: req.body.horaIntervencion,     
            fechaIntervencion: req.body.fechaIntervencion,     
            lugar: req.body.lugar,     
            institucion: req.body.institucion,     
            inicio: req.body.inicio,     
            folio: req.body.folio,     
        });        
        
        Carpeta.create(folder.dataValues, {
            fields: ['nuc', 'isOpen', 'horaIntervencion', 'fechaIntervencion', 'lugar', 'institucion', 'inicio', 'folio']
        })
        .then(result => {                       
            res.json({
                OK: true,
                Carpeta: result
            });
        })
        .catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
        });        
    }
    

    app.getCarpetas = (req, res) => {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
      
        Carpeta.findAndCountAll({ 
            order: [
                ['fechaIntervencion', 'DESC'],
            ],
            limit, 
            offset 
        })
        .then(re => {
            const response = getPagingData(re, page, limit);
            res.send(response);
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getTotalCarpetas = (req, res) => {
        Carpeta.count({}).then(result => {
            res.json({
                OK: true,
                Total: result
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

    const getPagination = (page, size) => {
        const limit = size ? +size : 10;
        const offset = +page;
        return { limit, offset };
    }

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: registers } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        
        return { totalPages, totalItems, currentPage, registers };
    }

    return app;
}