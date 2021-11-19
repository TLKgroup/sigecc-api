module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const UsuarioAPP = app.controllers.usuario_app;
    // const { UniqueUsuarioInsert, UniqueUsuarioUpdate } = app.middlewares.usuario;

    app.get('/getUsuariosApp', UsuarioAPP.getUsersApp);
}