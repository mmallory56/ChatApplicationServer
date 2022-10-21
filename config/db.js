const mongoose = require('mongoose')
const process = require('process')

const connectDB = async()=>{
    
    try{
        
        const conn = await mongoose.connect(process.env.MONGO_DB,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex:true,
                useFindAndModify:false
            })
          
            console.log(`mongoDB connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
        process.exit(1);
    }
}

module.exports =connectDB;