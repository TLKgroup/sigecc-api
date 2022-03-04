module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const UsuarioAPP = app.controllers.usuario_app;
    const { UniqueUserAppInsert, UniqueUserAppUpdate } = app.middlewares.usuarioapp;

    app.get('/getUsuariosApp', UsuarioAPP.getUsersApp);
    
    app.post('/AddUsuarioApp', [UniqueUserAppInsert], UsuarioAPP.AddUserApp);
    
    app.put('/updateUsuarioApp/:id', [UniqueUserAppUpdate], UsuarioAPP.updateUserApp);
    
    app.delete('/deleteUsuarioApp/:id' , UsuarioAPP.deleteUserApp);

    app.get('/getCountUserApp', UsuarioAPP.getCountUserApp);
}

