module.exports = app => {
    
    const ServidoresPublico = app.controllers.servidorpublico;    

    app.post('/addNewServidorPublico', ServidoresPublico.addNewServidorPublico); 

    app.post('/getServidorPublicoXNUC', ServidoresPublico.getServidorPublicoXNUC); 

    app.post('/getServidorPublicoXIndicio', ServidoresPublico.getServidorPublicoXIndicio); 
}