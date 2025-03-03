const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ Database connected successfully : ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ Database connection error", error);
        process.exit(1);
    }
};

module.exports = connectDB;
