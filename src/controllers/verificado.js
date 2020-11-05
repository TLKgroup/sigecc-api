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

    return app;
}