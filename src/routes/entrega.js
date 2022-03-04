module.exports = app => {
    
    const Entregas = app.controllers.entrega;    

    app.post('/addNewEntrega', Entregas.addNewEntrega); 

    app.post('/getEntregaXNUC', Entregas.getEntregaXNUC); 

    app.post('/getEntregaXIndicioNUC', Entregas.getEntregaXIndicioNUC); 

}
