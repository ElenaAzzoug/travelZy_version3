const express = require('express');

const {
    createCategory,
} = require('../services/categoryService');

const router = express.Router(); // create a new router  object 


router.route('/')
                 .post(createCategory); // create a new category using the createCategory function when a POST request is made to the / route






module.exports = router; // export the router object