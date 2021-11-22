module.exports = app => {
    
    const UsuarioAPP = app.database.models.UsuariosAPP;
    const Sequelize = app.database.Sequelize;
    const Op = Sequelize.Op;

    app.UniqueUserAppInsert = async (req, res, next) => {    
        
        let usuario = await UsuarioAPP.findOne({ 
            where: Sequelize.and({
                status: '1'
            }, 
            Sequelize.or({
                usuario: req.body.usuario
            }))
        });

        if(usuario) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            usuario: req.body.usuario
                        }
                    }
                }
            });
        }        

        next();
    }

    app.UniqueUserAppUpdate = async (req, res, next) => {    
        
        let usuario = await UsuarioAPP.findOne({ 
            where: Sequelize.and({
                status: '1',
                id_usuario_app: {
                    [Op.ne]: req.params.id
                }
            }, 
            Sequelize.or({
                usuario: req.body.usuario
            }))
        });

        if(usuario) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            usuario: req.body.usuario
                        }
                    }
                }
            });
        }        

        next();
    }


    return app;
}