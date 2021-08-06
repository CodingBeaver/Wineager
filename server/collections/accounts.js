
let accounts


module.exports= class accountsDAO{
 static async injectAccounts(connection){

    if(accounts)return;

        try {
            
            accounts =  await connection.db("winery").collection("accounts")
            
        } catch (error) {
            console.error("Unable to connect to accounts collection")
            
        }
    


}


static async getAccounts(){

    return accounts
}
}

