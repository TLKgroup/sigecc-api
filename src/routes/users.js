module.exports = app => {
    
    const { verificarToken } = app.middlewares.auth;
    const Users = app.controllers.users;    

    app.get('/users', verificarToken, Users.getUsersFirebase);

    app.put('/deleteU', Users.deleteUserFirebase);
}