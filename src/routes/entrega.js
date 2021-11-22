module.exports = app => {
    
    const Entregas = app.controllers.entrega;    

    app.post('/addNewEntrega', Entregas.addNewEntrega); 

}
