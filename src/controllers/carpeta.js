const Sequelize = require('sequelize');

module.exports = app => {

    const Op = Sequelize.Op;
    const Carpeta = app.database.models.Carpeta;

    app.addNewFolder = (req, res) => {
        let folder = new Carpeta({ 
            nuc: req.body.nuc,     
            isOpen: 'true',     
            horaIntervencion: req.body.horaIntervencion,     
            horaCreacion: req.body.horaCreacion,     
            fechaIntervencion: req.body.fechaIntervencion,     
            lugar: quitarAcentos(req.body.lugar),     
            institucion: req.body.institucion,     
            inicio: req.body.inicio,     
            folio: req.body.folio,     
            entregado: 'false'     
        });        
        
        Carpeta.create(folder.dataValues, {
            fields: ['nuc', 'isOpen', 'horaIntervencion', 'horaCreacion', 'fechaIntervencion', 'lugar', 'institucion', 'inicio', 'folio', 'entregado']
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

    app.updateFolder = (req, res) => {
        let nu = req.params.nuc;
        let body = req.body;

        let upcc = new Carpeta({    
            horaIntervencion: body.horaIntervencion,
            fechaIntervencion: body.fechaIntervencion,		
            lugar: body.lugar,
            institucion: body.institucion,
            inicio: body.inicio,
            folio: body.folio
        });        

        Carpeta.update(upcc.dataValues, {            
            where : {
                nuc: nu
            },           
            fields: ['horaIntervencion', 'fechaIntervencion', 'lugar', 'institucion', 'inicio', 'folio']
        }).then(result => {            
            res.json({
                OK: true,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err
            });
        });   
    }

    //Peritos
    app.getFolderXPerito = (req, res) => {
        let body = req.body;

        Carpeta.findAll({ 
            where:{
                entregado: 'false',
                nuc: body.nuc,
            }
        })
        .then(re => {
            res.json({
                OK: true,
                Resultado: re
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    // app.getFoldersPeritos = (req, res) => {

    //     Carpeta.findAll({ 
    //         where:{
    //             entregado: 'false',
    //             isOpen: 'true'
    //         },
    //         order: [
    //             ['fechaIntervencion', 'DESC'],
    //         ]
    //     })
    //     .then(re => {
    //         res.json({
    //             OK: true,
    //             Total: re.length,
    //             Resultado: re
    //         })
    //     })
    //     .catch(error => {
    //         res.status(412).json({
    //             msg: error.message
    //         });
    //     });
    // }

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