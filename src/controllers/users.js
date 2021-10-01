module.exports = app => {

    const dbFirebase = app.dbFirestore;
    const dbFire = app.dbFirebase;

    app.getUsersFirebase = async (req, res)  => {
        let users = [];
        await dbFirebase.collection('users').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                users.push(
                    {
                        id: doc.id, 
                        data: doc.data()
                    }
                );
            });
        });

        if(users) {
            res.json({
                OK: true,
                Users: users
            });
        }
    }

    app.deleteUserFirebase = async (req, res)  => {
        let body = req.body;
            
        var user = dbFire.auth().currentUser;

        let deleteUser = await user.delete(body.id);
       
        if(deleteUser) {
            res.json({
                OK: true
            });
        }
    }

    return app;
}