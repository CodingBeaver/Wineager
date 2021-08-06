const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwtGenerator= require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const auth = require("../middleware/authorization");
const accountsDAO = require("../../../collections/accounts");
const dataDAO = require("../../../collections/data");
const { query } = require("express");
const { ObjectId } = require("mongodb");


//register
router.post("/register", validInfo, async(req,res)=>{


    const  accounts = await accountsDAO.getAccounts()
    const data = await dataDAO.getData()

    try {
        const {name, email, password}= req.body;
        const query= {
            email:email
        }
        
        const options = {
            projections: {
                email:1,
                _id:0
            }
        }
        const users = await accounts.find(query,options).toArray()
        console.log(users)
        //check for existing users
        if(users.length!==0){
            return res.status(401).json("User already exists")
        }
        // generate bxrypt password
        const saltRound=10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword =  await bcrypt.hash(password,salt);

        //enter new user
        const insert ={
            name:name,
            email:email,
            password:bcryptPassword
        }
        
        const user = await accounts.insertOne(insert)
        const insertData= {
            account_id:ObjectId(user.insertedId),
            bacve:[],
            radnje:[],
            parcele:[],
            radnje_vinograd:[],
            prskanja:[],
            skladiste:[]
        }
        await data.insertOne(insertData);

        await console.log(user)
        console.log(user)
        //generating a jwt token
        const token = jwtGenerator(user.insertedId);



        res.status(200).json({token});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error")  
    }
})

//login route

router.post("/login", validInfo, async(req,res)=>{

    const  accounts = await accountsDAO.getAccounts()

    try {
            const{email,password}= req.body;
            const query = {
                email:email
            }

            //check if user exists
            const users = await accounts.find(query).toArray()
            if(users.length === 0){
                return res.status(404).json("Email or password incorrect")
            }
            console.log(users)
            //check password
            
            const validPassword =  await bcrypt.compare(password, users[0].password)
            if(!validPassword){
                return res.status(401).json("Email or password incorrect")
            }
            //give them the token

            const token = jwtGenerator(users[0]._id);
            res.json({token})


    } catch (error) {
        console.error(error.message)
    }
})

router.get("/verify", auth, async(req,res)=>{
    try {
        res.json({
            status:true,
            id: req.user
        });
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;