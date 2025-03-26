const mongoose = require("mongoose");


const connectDB = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then((conn)=> console.log(`Database connected successfully ^_^ : ${conn.connection.host}`))	
    .catch((err) => {console.log(err)
    process.exit(1);
    });
}


module.exports = connectDB;