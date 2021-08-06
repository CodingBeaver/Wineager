const router = require("express").Router();
const { ObjectId } = require("mongodb");
const accountsDAO = require("../../../collections/accounts");
const auth= require("../middleware/authorization");


router.get("/", auth, async(req,res)=>{
    
    const accounts =  await accountsDAO.getAccounts();
    console.log(req.user)
    const query= {
        _id: ObjectId(req.user)
    }
    const options={
        projection:{
            name:1,
            _id:0
        }
    }
    try {
        const user= await accounts.find(query, options).toArray()
        res.json(user[0])
        console.log(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
    }
})


 module.exports = router;