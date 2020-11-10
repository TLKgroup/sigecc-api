module.exports = app => {

    const dbFirebase = app.dbFirestore;

    app.getVerificadoFirebase = async (req, res)  => {
        let verificado = [];
        await dbFirebase.collection('verificacion').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                verificado.push(
                    {
                        id: doc.id, 
                        data: doc.data()
                    }
                );
            });
        });

        if(verificado) {
            res.json({
                OK: true,
                Verificado: verificado
            });
        }
    }

    
    
    app.updateVerificadoFirebase = async (req, res)  => {
        let body = req.body;
        
        let verificado = {
            completado: body.completado,   
        };

        let usuarios = {
            verificado: body.completado   
        };

  

        let verificacion = await dbFirebase.collection('verificacion').doc(body.uid).update(verificado);
        let userVerificado = await dbFirebase.collection('users').doc(body.uidUser).update(usuarios);
        
        
        if(verificacion) {
            res.json({
                OK: true,
            });
        }
        if(userVerificado) {
            res.json({
                OK: true,
            });
        }
    }
    
    return app;
  
}