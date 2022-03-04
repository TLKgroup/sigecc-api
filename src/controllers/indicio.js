const Sequelize = require('sequelize');

module.exports = app => {

    const Op = Sequelize.Op;
    const Indicio = app.database.models.Indicio;

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
        let body = req.body;

        Indicio.findAll({ 
            where:{
                nuc: body.nuc,
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

    app.getIndiciosXNaturalezaAndNUC = (req, res) => {
        let body = req.body;

        Indicio.findAll({ 
            where:{
                nuc: body.nuc,
                naturaleza: body.naturaleza
            }
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                IndiciosNN: result
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

    app.addNewIndicio = (req, res) => {

        var fs = require('fs');

        var quitarDiagonal = req.body.nuc.split('/');
        var carpeta = quitarDiagonal.join('-');
        var foto1 = req.body.foto1;
        var foto2 = req.body.foto2;
        var dir = 'images/' + carpeta;

        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true});
        }

        if(req.body.foto1 ==  null || req.body.foto1 == '' || req.body.foto1 == 'null') {
            foto1 = 'NA';
        }
        else {
            var big1 = Buffer(foto1, 'base64');
            fs.writeFileSync(dir +'/foto1_indicio_' + req.body.identificacion + '.jpg', big1);
    
            foto1 = dir +'/foto1_indicio_' + req.body.identificacion + '.jpg';
        }

        if(req.body.foto2 ==  null || req.body.foto2 == '' || req.body.foto2 == 'null') {
            foto2 = 'NA';
        }
        else {
            var big2 = Buffer(foto2, 'base64');
            fs.writeFileSync(dir +'/foto2_indicio_' + req.body.identificacion + '.jpg', big2);
    
            foto2 = dir +'/foto2_indicio_' + req.body.identificacion + '.jpg';
        }
     
        let folderIndicio = new Indicio({ 
            identificacion: req.body.identificacion,
            descripcion: quitarAcentos(req.body.descripcion),
            fecha: req.body.fecha,
            hora: req.body.hora,
            documentacion: req.body.documentacion,
            recoleccion: req.body.recoleccion,
            embalaje: req.body.embalaje,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            lugar: req.body.lugar,
            foto1: foto1,
            naturaleza: req.body.naturaleza,
            nombreUsuario: req.body.nombreUsuario,
            usuario: req.body.usuario,
            foto2: foto2,
            smart_tag: req.body.smart_tag,
            nuc: req.body.nuc,
            escrito: req.body.escrito,
            fotografico: req.body.fotografico,
            croquis: req.body.croquis,
            otro: req.body.otro,
            especifique: req.body.especifique,
            entregado: 'false'
        });        
        
        Indicio.create(folderIndicio.dataValues, {
            fields: [
                'identificacion',
                'descripcion',
                'fecha',
                'hora',
                'documentacion',
                'recoleccion',
                'embalaje',
                'latitud',
                'longitud',
                'lugar',
                'foto1',
                'naturaleza',
                'nombreUsuario',
                'usuario',
                'foto2',
                'smart_tag',
                'nuc',
                'escrito',
                'fotografico',
                'croquis',
                'otro',
                'especifique',
                'entregado'
            ]
        })
        .then(result => {                       
            res.json({
                OK: true,
                Indicio: result
            });
        })
        .catch(err => {            
            res.status(412).json({
                OK: false,
                msg: err
            });
            console.log(err);
        });        
    }

    app.updateIndicio = (req, res) => {
        let id = req.params.id_indicio;
        let body = req.body;

        let upcc = new Indicio({    
            descripcion: body.descripcion,	
            lugar: body.lugar
        });        

        Indicio.update(upcc.dataValues, {            
            where : {
                id_indicio: id
            },           
            fields: ['descripcion', 'lugar']
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

    app.deleteIndicio = (req, res) => {
        let id = req.params.id_indicio;

        let indicio = new Indicio({
            estado: '1'
        });

        Indicio.update(indicio.dataValues, {
            where: {
                id_indicio: id
            },
            fields: ['estado']
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
    app.getIndiciosXPeritoAndFolder = (req, res) => {
        var perito = req.params.usuario;

        Indicio.findAll({ 
            where:{
                entregado: 'false',
                estado: '0',
                usuario: perito
            },
            order: [
                ['fecha', 'ASC'],
            ]
        })
        .then(result => {
            res.json({
                OK: true,
                Total: result.length,
                IndiciosPF: result
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