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

    return app;
}