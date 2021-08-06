const {MongoClient} = require("mongodb");
require("dotenv").config()

const  dataDAO= require("./collections/data");
const accountsDAO = require("./collections/accounts");



const uri = process.env.DB_URI;

const client = new MongoClient(uri);

 async function runDb(){


    try {

        await client.connect();


        const database= client.db("winery");
        await dataDAO.injectData(client)
        console.log("Connected to the data collection")

        await accountsDAO.injectAccounts(client)
        console.log("Connected to the accounts collection")



    } catch(error){
      console.log(error.message)
      rocess.exit(1)
    }
    }
    

module.exports = runDb;