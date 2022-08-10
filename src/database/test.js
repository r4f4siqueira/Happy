const Database = require('./db');
const saveOrphanage = require('./saveOrphanage');

Database.then(async (db) =>{
    //inserir dados naa tabela
    await saveOrphanage(db,{
        lat: "-22.2348294",
        lng: "-54.8281412",
        name: "Lar dos meninos",
        about: "Presta acistencia para crianças de 06 a 15 anos que se encontre em situação de risco",
        whatsapp: "99999-9999",
        images: [
            "http://127.0.0.1:5500/images/01.jpg",

            "http://127.0.0.1:5500/images/01.jpg"
        ].toString(),
        instructions: "venha como se sentir a vontade e traga muito amor e paciencia para dar.",
        opening_hours: "Horário de visitas das 18h até 8h",
        open_on_weekends: "5"
    })

    //consultar daados na tabela
    const selectedOrphanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrphanages)

    //consultar somente um orphanatp
    const Orphanages = await db.all('SELECT * FROM orphanages where id= "2"')
    console.log(Orphanages)

    //deletar dado da tabela
   // console.log(await db.run("DELETE FROM orphanages WHERE id = '4'"))
    //console.log(await db.run("DELETE FROM orphanages WHERE id = '5'"))
})