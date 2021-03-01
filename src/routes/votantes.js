module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Votantes = app.controllers.votantes;    

    app.get('/votantes', verificarToken, Votantes.getVotantesFirebase);
}