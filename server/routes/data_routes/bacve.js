const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


//GET all bacve

router.get("/:id",async(req,res)=>{

    const query ={
        account_id: ObjectId(req.params.id)
    }
    const options= {
        projection:{bacve:1, _id:0}
    }


try {
    const data = await dataDAO.getData()

    const response = await data.findOne(query, options)
    
    res.status(200).json(response)
} catch (error) {
    res.status(500).json(error.message)
    console.error(error.message)
}
})

//GET bacva by bacva_id

router.get("/:id/bacva/:bacva_id",async(req,res)=>{

    const query= {
        account_id: ObjectId(req.params.id),
        bacve:{
            $elemMatch:{
                bacva_id: ObjectId(req.params.bacva_id)
            }
        }
    }
    const options = {
        projection:{
            "bacve.$":1,
            _id:0
        }
    }
    try {
        const data = await dataDAO.getData();

        const response = await data.findOne(query,options);

        res.status(200).json(response.bacve[0])
    } catch (error) {
        res.status(500).json(error.message)
    console.error(error.message)
    }

})



// INSERT a new bacva

router.patch("/:id",async(req,res)=>{

    const filter={
        account_id: ObjectId(req.params.id)
    }
    const update= {
        $push:{
            bacve:{
                bacva_id:ObjectId(),
                naziv:req.body.naziv,
                kapacitet:req.body.kapacitet,
                trenutni_volumen: req.body.trenutni_volumen,
                sorta: req.body.sorta,
                datum: req.body.datum,
                parcela: req.body.parcela,
                alkohol: req.body.alkohol,
                sumpor: req.body.sumpor

            }
        }
    }

    try {
        const data = await dataDAO.getData();
        const response =await data.updateOne(filter,update)

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }
})

// UPDATE a bacva
router.patch("/:id/bacva/:bacva_id",async(req,res)=>{

    const query= {
        account_id: ObjectId(req.params.id),
        bacve:{
            $elemMatch:{
                bacva_id: ObjectId(req.params.bacva_id)
            }
        }
    }

    const update= {
        $set:{
                "bacve.$.naziv":req.body.naziv,
                "bacve.$.kapacitet":req.body.kapacitet,
                "bacve.$.trenutni_volumen": req.body.trenutni_volumen,
                "bacve.$.sorta": req.body.sorta,
                "bacve.$.datum": req.body.datum,
                "bacve.$.parcela": req.body.parcela,
                "bacve.$.alkohol": req.body.alkohol,
                "bacve.$.sumpor": req.body.sumpor

            }
        }
    
    const options = {
        projection:{
            "bacve.$":1,
            _id:0
        }
    }
    try {
        const data = await dataDAO.getData();

        const response = await data.updateOne(query,update,options);

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error.message)
    console.error(error.message)
    }

})


//DELETE a bacva

router.delete("/:id/delete/:bacva_id",async(req,res)=>{

    const query ={
        account_id: ObjectId(req.params.id),
        bacve:{
            $elemMatch:{
                bacva_id: ObjectId(req.params.bacva_id)
            }
        }
    }

    const  update = {

        $pull:{
            bacve:{
                bacva_id: ObjectId(req.params.bacva_id)
            }
        }
    }

    try {
        const data = await  dataDAO.getData();

        const response = await data.updateOne(query,update);

        res.status(200).json(response)
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message)
    }


})


module.exports =router