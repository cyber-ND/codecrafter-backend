const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            w:1
        })
        console.log(`Mongodb connect: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error connecting to Mongodb: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB