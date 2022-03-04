module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Carpeta = app.controllers.carpeta;    
    
    app.post('/addNewFolder', Carpeta.addNewFolder); 

    app.get('/getCarpetas', Carpeta.getCarpetas);
    
    app.get('/getCarpetasTotal', Carpeta.getTotalCarpetas);
    
    app.put('/updateFolder/:nuc', Carpeta.updateFolder);
    
    //Peritos

    app.post('/getFolderXPerito', Carpeta.getFolderXPerito);
}