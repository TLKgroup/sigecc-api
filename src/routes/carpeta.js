module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Carpeta = app.controllers.carpeta;    

    app.get('/getCarpetas', Carpeta.getCarpetas);

    app.get('/getCarpetasTotal', Carpeta.getTotalCarpetas);

}