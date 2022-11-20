const mongoose=require('mongoose')

const connectWithDB=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log('database connected')).catch(console.log("Server is not connected to database"))
}

module.exports=connectWithDB;


