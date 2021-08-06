const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


// GET all  parcele in parcele
router.get("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    const options= {
        projection: {
            parcele:1,
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


// GET a parcela by parcela_id

router.get("/:id/parcela/:parcela_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        parcele:{
            $elemMatch:{
                parcela_id: ObjectId(req.params.parcela_id)
            }
        }
    }

    const options = {
        projection: {
            "parcele.$":1,
            _id:0
        }
    }


   
    try {
        const data = await dataDAO.getData();

        const response =  await data.findOne(query, options)

        res.status(200).json(response.parcele[0])
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})

// INSERT a parcela to parcele
router.patch("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }
/* 

                    naziv:String,
                    površina:Number,
                    sorta:String,
                    redovi:Number,
                    cokoti:Number
*/
  


    const update= {
        $push:{
            parcele:{
                parcela_id: ObjectId(),
                naziv: req.body.naziv,
                opis: req.body.opis,
                sorta: req.body.sorta,
                povrsina: req.body.povrsina,
                redovi: req.body.redovi,
                cokoti: req.body.cokoti,
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
// UPDATE a parcela 
router.patch("/:id/parcela/:parcela_id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id),
        parcele:{
            $elemMatch: 
            { 
                parcela_id:ObjectId(req.params.parcela_id)
            }
        }
    }


    const update= {
        $set:{
            "parcele.$.naziv": req.body.naziv,
            "parcele.$.opis": req.body.opis,
            "parcele.$.sorta": req.body.sorta,
            "parcele.$.povrsina": req.body.povrsina,
            "parcele.$.redovi": req.body.redovi,
            "parcele.$.cokoti": req.body.cokoti,
            "parcele.$.datum": req.body.datum


            
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


// DELETE a parcela
router.delete("/:id/delete/:parcela_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        parcele:{
            $elemMatch:{
                parcela_id: ObjectId(req.params.parcela_id)
            }
        }
    }

    const update = {
        $pull: {
            parcele:{
                parcela_id: ObjectId(req.params.parcela_id)
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