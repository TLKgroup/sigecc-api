module.exports = app => {
    
    const ServidoresPublico = app.controllers.servidorpublico;    

    app.post('/addNewServidorPublico', ServidoresPublico.addNewServidorPublico); 

}