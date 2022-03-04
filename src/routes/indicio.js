module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Indicios = app.controllers.carpeta;    

    app.get('/getIndicios', Indicios.getIndicios); 
    
    app.post('/getIndiciosxNUC', Indicios.getIndiciosXNUC);

    app.post('/getIndiciosXNaturalezaAndNUC', Indicios.getIndiciosXNaturalezaAndNUC); 

    app.get('/getIndiciosTotal', Indicios.getTotalIndicios); 

    app.post('/addNewIndicio', Indicios.addNewIndicio);

    app.put('/updateIndicio/:id_indicio', Indicios.updateIndicio); 

    app.delete('/deleteIndicio/:id_indicio', Indicios.deleteIndicio);

    //Perito
    app.get('/getIndiciosXPeritoAndFolder/:usuario', Indicios.getIndiciosXPeritoAndFolder);     
}