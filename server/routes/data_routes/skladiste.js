const router = require ("express").Router()
const {ObjectId} = require("bson");
const dataDAO = require("../../collections/data");


// GET all items in skladiste
router.get("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

    const options= {
        projection: {
            skladiste:1,
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


// GET an item by item_id

router.get("/:id/item/:item_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        skladiste:{
            $elemMatch:{
                item_id: ObjectId(req.params.item_id)
            }
        }
    }

    const options = {
        projection: {
            "skladiste.$":1,
            _id:0
        }
    }

    try {
        const data = await dataDAO.getData();

        const response =  await data.findOne(query,options)

        res.status(200).json(response.skladiste[0])
    } catch (error) {
        res.status(500).json(error.message)
        console.error(error.message)
    }

})



// INSERT an item to skladiste
router.patch("/:id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id)
    }

/*


                        naziv:String,
                        opis:String,
                        količina:Number,
                        jedinica:String,
                        datum:Date,
*/

    const update= {
        $push:{
            skladiste:{
                item_id: ObjectId(),
                naziv: req.body.naziv,
                opis: req.body.opis,
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
// UPDATE an item 
router.patch("/:id/item/:item_id",async(req,res)=>{

    const query = {
        account_id: ObjectId(req.params.id),
        skladiste:{
            $elemMatch: 
            { 
                item_id:ObjectId(req.params.item_id)
            }
        }
    }

/*


                        naziv:String,
                        opis:String,
                        količina:Number,
                        jedinica:String,
                        datum:Date,
*/

    const update= {
        $set:{
            "skladiste.$.naziv": req.body.naziv,
            "skladiste.$.opis": req.body.opis,
            "skladiste.$.kolicina": req.body.kolicina,
            "skladiste.$.jedinica": req.body.jedinica,
            "skladiste.$.datum": req.body.datum

            
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


// DELETE an item
router.delete("/:id/delete/:item_id",async(req,res)=>{


    const query ={
        account_id: ObjectId(req.params.id),
        skladiste:{
            $elemMatch:{
                item_id: ObjectId(req.params.item_id)
            }
        }
    }

    const update = {
        $pull: {
            skladiste:{
                item_id: ObjectId(req.params.item_id)
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