const express =  require("express");
const cors = require("cors");
const app = express();
const runDb =  require("./db")

require("dotenv").config();

const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())
app.use("/api/data",require("./routes/data_route"))
app.use("/api/accounts",require("./routes/account_route"))

    async function startServer(){
        try {
            await runDb();
            
            await app.listen(PORT,()=>{
        
                console.log(`Server is running at port ${PORT}`);
                
            })

            
        } catch (error) {
            
        }
    }
startServer()