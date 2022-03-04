module.exports = app => {
    
  
    const Conexion = app.controllers.conexion;    
    
    app.get('/getConexion', Conexion.getConexion);
}