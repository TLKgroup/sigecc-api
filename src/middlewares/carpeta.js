module.exports = app => {
    
    const Carpeta = app.database.models.Carpeta;
    const Sequelize = app.database.Sequelize;
    const Op = Sequelize.Op;

    app.UniqueFolderInsert = async (req, res, next) => {    
        
        let folder = await Carpeta.findOne({ 
            where: Sequelize.or({
                nuc: req.body.nuc
            })
        });

        if(folder) {
            return res.status(422).json({
                OK: false,
                msg: {
                    error: {
                        fields:{
                            nuc: req.body.nuc
                        }
                    }
                }
            });
        }        

        next();
    }
    
    return app;
}