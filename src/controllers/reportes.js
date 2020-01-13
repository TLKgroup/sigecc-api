module.exports = app => {

    const dbFirebase = app.dbFirestore;

    app.getReportFirebase = async (req, res)  => {
        let reports = [];
        await dbFirebase.collection('reports').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                reports.push(
                    {
                        id: doc.id, 
                        data: doc.data()
                    }
                );
            });
        });

        if(reports) {
            res.json({
                OK: true,
                Reportes: reports
            });
        }
    }


    return app;

}