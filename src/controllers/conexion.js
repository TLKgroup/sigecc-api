module.exports = app => {

    const Usuario = app.database.models.Usuarios;
  
    app.getConexion = (req, res) => {
        Usuario.findAll({ 
            where:{
                id_usuario: '1',
            }
        })
        .then(re => {
            res.json({
                OK: true,
                Resultado: 'Conexion exitosa'
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