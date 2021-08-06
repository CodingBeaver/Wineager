
let data


module.exports = class dataDAO{
 static async injectData(connection){

    if(data)return;

        try {
            
            data =  await connection.db("winery").collection("data");
            
           

        } catch (error) {
            console.error("Unable to connect to data collection")
            
        }
    
}

static async getData(){

    return data
}
}

