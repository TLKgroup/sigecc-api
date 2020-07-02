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
    
    app.setStatus = async (req, res)  => {
        let body = req.body;
            
        let report = {
            status: body.status,
            modificationAt: body.modificationAt,    
        };
        
        let reportRef = await dbFirebase.collection('reports').doc(body.id).update(report);
       
        if(reportRef) {
            res.json({
                OK: true
            });
        }
    }

    return app;
}