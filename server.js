const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require('./config/databases');
const promoRoute = require("./routes/promoRoute");
const categoryRoute = require('./routes/categoryRoute');

// Connect to MongoDB Database using Mongoose 
connectDB();

// Create an Express App   
const app = express();

// Middlewares
app.use(express.json()); // Pour parser les requêtes JSON

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
    console.log(`Mode : ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/coupons", promoRoute);
app.use('/api/v1/categories', categoryRoute);

// Définir une route de test
app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
