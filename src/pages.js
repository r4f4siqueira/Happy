const Database = require('./database/db');
const saveOrphanage = require('./database/saveOrphanage');

module.exports = {
    index(req, res) {
        return res.render('index')
    },

    async orphanage(req ,res){
        const id = req.query.id

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]

            //como fazer if ternario
            if(orphanage.open_on_weekends == "0"){
                orphanage.open_on_weekends = false
            }else{
                orphanage.open_on_weekends=true
            }

            return res.render('orphanage', {orphanage})
        } catch (error) {
            console.log(error)
            return res.send('erro no banco de dados!!!')
        }
    },

    async orphanages(req, res){
        try{
            const db = await Database;
            const orphanages = await db.all("SELECT * FROM orphanages")
            return res.render('orphanages',{orphanages})
        } catch(error){
            console.log(error)
            return res.send('erro no banco de dados!')
        }
    },

    createOrphanage(req, res){
        return res.render('create-orphanage')
    },

    async saveOrphanage(req, res){
        const filds = req.body
        //validar se todos os campos estao preenchidos
        if(Object.values(filds).includes('')){
            return res.send('Todos os campos devem ser preenchidos!!!')
        }
        try {
            //salvar um orfanato
            const db = await Database
            await saveOrphanage(db,{
            lat: filds.lat,
            lng: filds.lng,
            name: filds.name,
            about: filds.about,
            whatsapp: filds.whatsapp,
            images: filds.images.toString(),
            instructions: filds.instructions,
            opening_hours: filds.opening_hours,
            open_on_weekends: filds.open_on_weekends,
        })
        //redirecionamento
        return res.redirect('/orphanages')    
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados!!')
        }
    }
}