const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


// GET all  radnje_vinograd in radnje_vinograd
router.get("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    const options= {
        projection: {
            radnje_vinograd:1,
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


// GET a radnja by radnja_id

router.get("/:id/radnja/:radnja_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        radnje_vinograd:{
            $elemMatch:{
                radnja_id: ObjectId(req.params.radnja_id)
            }
        }
    }

    const options = {
        projection: {
            "radnje_vinograd.$":1,
            _id:0
        }
    }


   
    try {
        const data = await dataDAO.getData();

        const response =  await data.findOne(query, options)

        res.status(200).json(response.radnje_vinograd[0])
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})
//GET radnje_vinograd by parcela_id
router.get("/:id/parcela/:parcela_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        radnje_vinograd:{
            $elemMatch:{
                parcela_id: ObjectId(req.params.parcela_id)
            }
        }
    }

    const options = {
        projection: {
            radnje_vinograd:1,
            account_id:0
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




// INSERT a radnja to radnje_vinograd
router.patch("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    


    const update= {
        $push:{
            radnje_vinograd:{
                radnja_id: ObjectId(),
                naziv: req.body.naziv,
                opis: req.body.opis,
                parcela: req.body.parcela,
                parcela_id: ObjectId(req.body.parcela_id),
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
// UPDATE a radnja 
router.patch("/:id/radnja/:radnja_id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id),
        radnje_vinograd:{
            $elemMatch: 
            { 
                radnja_id:ObjectId(req.params.radnja_id)
            }
        }
    }


    const update= {
        $set:{
            "radnje_vinograd.$.naziv": req.body.naziv,
            "radnje_vinograd.$.opis": req.body.opis,
            "radnje_vinograd.$.parcela":req.body.parcela,
            "radnje_vinograd.$.parcela_id": ObjectId(req.body.parcela_id),
            "radnje_vinograd.$.datum": req.body.datum

            
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


// DELETE a radnja
router.delete("/:id/delete/:radnja_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        radnje_vinograd:{
            $elemMatch:{
                radnja_id: ObjectId(req.params.radnja_id)
            }
        }
    }

    const update = {
        $pull: {
            radnje_vinograd:{
                radnja_id: ObjectId(req.params.radnja_id)
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