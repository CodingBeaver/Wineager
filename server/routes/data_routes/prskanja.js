const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


// GET all  prskanja in prskanja
router.get("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    const options= {
        projection: {
            prskanja:1,
            _id:0
        }
        
    }

    try {
        const data = await dataDAO.getData();


        const response = await data.findOne(query,options)

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)       
    }
})


// GET a prskanje by prskanje_id

router.get("/:id/prskanje/:prskanje_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        prskanja:{
            $elemMatch:{
                prskanje_id: ObjectId(req.params.prskanje_id)
            }
        }
    }

    const options = {
        projection: {
            "prskanja.$":1,
            _id:0
        }
    }


   
    try {
        const data = await dataDAO.getData();

        const response =  await data.findOne(query, options)

        res.status(200).json(response.prskanja[0])
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})

//GET prskanja by parcela_id
router.get("/:id/parcela/:parcela_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        prskanja:{
            $elemMatch:{
                parcela_id: ObjectId(req.params.parcela_id)
            }
        }
    }

    const options = {
        projection: {
            prskanja:1,
            _id:0
        }
    }


   
    try {
        const data = await dataDAO.getData();

        const response =  await data.find(query, options).toArray()

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})




// INSERT a prskanje to prskanja
router.patch("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    /*

        parcela_id: mongoose.Types.ObjectId,
            naziv:String,
            opis:String,
            sredstvo:String,
            kolicina:Number,
            jedinica:String,
            datum: Date
    */


    const update= {
        $push:{
            prskanja:{
                prskanje_id: ObjectId(),
                naziv: req.body.naziv,
                opis: req.body.opis,
                parcela: req.body.parcela,
                parcela_id: ObjectId(req.body.parcela_id),
                sredstvo: req.body.sredstvo,
                kolicina: req.body.kolicina,
                jedinica: req.body.jedinica,
                datum: req.body.datum

            }
        }
    }
    try {
        const data = await dataDAO.getData();

        const response =  await data.updateOne(query,update);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }
})
// UPDATE a prskanje 
router.patch("/:id/prskanje/:prskanje_id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id),
        prskanja:{
            $elemMatch: 
            { 
                prskanje_id:ObjectId(req.params.prskanje_id)
            }
        }
    }


    const update= {
        $set:{
            "prskanja.$.naziv": req.body.naziv,
            "prskanja.$.opis": req.body.opis,
            "prskanja.$.parcela":req.body.parcela,
            "prskanja.$.parcela_id": ObjectId(req.body.parcela_id),
            "prskanja.$.sredstvo": req.body.sredstvo,
            "prskanja.$.kolicina": req.body.kolicina,
            "prskanja.$.datum": req.body.datum

            
        }
    }
    try {
        const data = await dataDAO.getData();

        const response =  await data.updateOne(query,update);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }
})


// DELETE a prskanje
router.delete("/:id/delete/:prskanje_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        prskanja:{
            $elemMatch:{
                prskanje_id: ObjectId(req.params.prskanje_id)
            }
        }
    }

    const update = {
        $pull: {
            prskanja:{
                prskanje_id: ObjectId(req.params.prskanje_id)
            }
        }
    }

    try {
        const data = await dataDAO.getData();

        const response =  await data.updateOne(query,update)

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})


module.exports = router