const mongoose = require("mongoose");

async function connectDB() {
    try{
        const obj = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB: ",obj.connection.name)
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB