const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


// GET all  radnje in radnje
router.get("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    const options= {
        projection: {
            radnje:1,
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
        radnje:{
            $elemMatch:{
                radnja_id: ObjectId(req.params.radnja_id)
            }
        }
    }

    const options = {
        projection: {
            "radnje.$":1,
            _id:0
        }
    }


   
    try {
        const data = await dataDAO.getData();

        const response =  await data.findOne(query, options)

        res.status(200).json(response.radnje[0])
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})



// INSERT a radnja to radnje
router.patch("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    


    const update= {
        $push:{
            radnje:{
                radnja_id: ObjectId(),
                naziv: req.body.naziv,
                opis: req.body.opis,
                ulaz: req.body.ulaz,
                izlaz: req.body.izlaz,
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
// UPDATE a radnja 
router.patch("/:id/radnja/:radnja_id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id),
        radnje:{
            $elemMatch: 
            { 
                radnja_id:ObjectId(req.params.radnja_id)
            }
        }
    }


    const update= {
        $set:{
            "radnje.$.naziv": req.body.naziv,
            "radnje.$.opis": req.body.opis,
            "radnje.$.ulaz": req.body.ulaz,
            "radnje.$.izlaz": req.body.izlaz,
            "radnje.$.kolicina": req.body.kolicina,
            "radnje.$.jedinica": req.body.jedinica,
            "radnje.$.datum": req.body.datum

            
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
        radnje:{
            $elemMatch:{
                radnja_id: ObjectId(req.params.radnja_id)
            }
        }
    }

    const update = {
        $pull: {
            radnje:{
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