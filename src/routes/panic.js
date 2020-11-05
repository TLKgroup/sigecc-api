module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Panic = app.controllers.panic;    

    app.get('/panic', verificarToken, Panic.getPanicFirebase);

    // app.put('/setstatus', verificarToken, Reporte.setStatus);
}