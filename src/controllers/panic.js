// const express = require('express');
// const webpush = require('web-push');
// const cors = require('cors');
// const bodyParser = require('body-parser');

module.exports = app => {

    const dbFirebase = app.dbFirestore;

    app.getPanicFirebase = async(req, res) => {
        let panic = [];
        await dbFirebase.collection('buttonPanic').get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.id, '=>', doc.data());
                    panic.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
            });

        if (panic) {
            res.json({
                OK: true,
                Panic: panic
            });
        }
    }



    // app.setStatus = async (req, res)  => {
    //     let body = req.body;

    //     let report = {
    //         modificationAt: body.modificationAt,    
    //         status: body.status
    //     };

    //     let reportRef = await dbFirebase.collection('reports').doc(body.id).update(report);

    //     if(reportRef) {
    //         res.json({
    //             OK: true
    //         });
    //     }
    // }

    return app;
}