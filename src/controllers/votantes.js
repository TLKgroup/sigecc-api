module.exports = app => {

    const dbFirebase = app.dbFirestore;

    app.getVotantesFirebase = async (req, res)  => {
        let votantes = [];
        await dbFirebase.collection('votantes').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                votantes.push(
                    {
                        id: doc.id, 
                        data: doc.data()
                    }
                );
            });
        });

        if(votantes) {
            res.json({
                OK: true,
                Votantes: votantes
            });
        }
    }

    return app;
}