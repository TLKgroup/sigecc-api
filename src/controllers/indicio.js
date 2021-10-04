const Sequelize = require('sequelize');

module.exports = app => {

    const Op = Sequelize.Op;
    const Indicio = app.database.models.Indicio;
    // const GPSQuiz = app.database.models.GPSQUIZ;

    app.getIndicios = (req, res) => {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
      
        Indicio.findAndCountAll({ 
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

    app.getIndiciosXNUC = (req, res) => {
        var ndc = req.params.nuc;

        Indicio.findAll({ 
            where:{
                nuc: ndc
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                Indicios: result
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.getTotalIndicios = (req, res) => {
        Indicio.count({}).then(result => {
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