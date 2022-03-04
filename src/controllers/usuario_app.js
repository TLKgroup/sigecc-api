module.exports = app => {

    const UsuarioAPP = app.database.models.UsuariosAPP;

    app.getUsersApp = (req, res) => {

        UsuarioAPP.findAll({
            where: {
                status: '1'
            },
        })
        .then(usuariosapp => {
            res.json({
                OK: true,
                UsuariosAPP: usuariosapp
            })
        })
        .catch(error => {
            res.status(412).json({
                msg: error.message
            });
        });
    }

    app.AddUserApp = (req, res) => {

        let body = req.body;

        let userApp = new UsuarioAPP({
            nombre: body.nombre,
            usuario: body.usuario,
            password: body.password,
            image: body.image,
            institucion: body.institucion,
            cargo: body.cargo,
            token: '',
            createAt: body.createAt,
        });

        UsuarioAPP.create(userApp.dataValues, {
            fields: ['nombre', 'usuario', 'password', 'image', 'institucion', 'cargo', 'token', 'createAt']
        })
        .then(result => {
            delete result.dataValues.password;
            res.json({
                OK: true,
                addUsuarioAPP: result
            })
        })
        .catch(error => {
            res.status(412).json({
                OK: false,
                msg: error.message
            });
        });
    }

    app.updateUserApp = (req, res) => {
        let id = req.params.id;
        let body = req.body;   
        let fields = ['nombre', 'usuario', 'institucion', 'cargo', 'status']     

        let usuario = new UsuarioAPP();        

        if(body.password) {
            usuario = new UsuarioAPP({
                nombre: body.nombre,
                usuario: body.usuario,
                password: body.password,
                institucion: body.institucion,
                cargo: body.cargo,
                status: '1'
            });

            fields.push('password');
        } else {
            usuario = new UsuarioAPP({
                nombre: body.nombre,
                usuario: body.usuario,                
                institucion: body.institucion,
                cargo: body.cargo,
                status: '1'
            });
        }

        UsuarioAPP.update(usuario.dataValues, {
            where: {
                id_usuario_app: id
            },
            fields
        }).then(result => {
            delete usuario.dataValues.password;
            res.json({
                OK: true,
                usuario,
                rows_affected: result[0]
            });
        }).catch(err => {
            res.status(412).json({
                OK: false,
                msg: err.message
            });
        });
    }

    app.deleteUserApp = (req, res) => {
        let id = req.params.id;

        let usuario = new UsuarioAPP({
            status: '0'
        });

        UsuarioAPP.update(usuario.dataValues, {
            where: {
                id_usuario_app: id
            },
            fields: ['status']
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

    app.getCountUserApp = (req, res) => {
        UsuarioAPP.count({}).then(result => {
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


    return app;
}