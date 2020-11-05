module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Verificado = app.controllers.verificado;    

    app.get('/verificado', verificarToken, Verificado.getVerificadoFirebase);
}