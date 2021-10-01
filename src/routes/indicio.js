module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Indicios = app.controllers.carpeta;    

    app.get('/getIndicios', Indicios.getIndicios); 
    
    app.get('/getIndiciosxNUC/:nuc', Indicios.getIndiciosXNUC); 

    app.get('/getIndiciosTotal', Indicios.getTotalIndicios); 

}