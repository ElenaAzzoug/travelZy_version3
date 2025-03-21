const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require('./config/databases');

// All Routes
const categoryRoute = require('./routes/categoryRoute');
const couponRoute = require('./routes/promoRoute');



// Connect to MongoDB Database using Mongoose 
connectDB();



 // Create an Express App   
const app = express();




// Middlewares
app.use(express.json()); // Cela signifie que si une requête HTTP contient un corps JSON, ce middleware convertira ce JSON en un objet JavaScript que vous pourrez facilement manipuler dans vos routes et vos gestionnaires de requêtes.


// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/coupons', couponRoute);




if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
    console.log(`mode : ${process.env.NODE_ENV}`);
}


// Définir une route de test
app.get("/", (req, res) => {
    res.send(" API is running...");
});



const PORT = process.env.PORT || 9000;

// Start the server on the specified port 
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});



