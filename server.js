const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require('./config/databases');
const categoryRoute = require('./routes/categoryRoute');




// Connect to MongoDB Database using Mongoose 
connectDB();





 // Create an Express App   
const app = express();




// Middlewares
app.use(express.json()); // Cela signifie que si une requête HTTP contient un corps JSON, ce middleware convertira ce JSON en un objet JavaScript que vous pourrez facilement manipuler dans vos routes et vos gestionnaires de requêtes.


// Mount Routes
app.use('/api/v1/categories', categoryRoute);




if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
    console.log(`mode : ${process.env.NODE_ENV}`);
}





const PORT = process.env.PORT || 9000;

// Start the server on the specified port 
app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
});



