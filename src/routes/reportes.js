

module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Reporte = app.controllers.reportes;    

    app.get('/reportes', verificarToken, Reporte.getReportFirebase);

    app.put('/setstatus', verificarToken, Reporte.setStatus);
}