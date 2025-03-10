 const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const CategoryModel = require('../models/categoryModel');







exports.createCategory = asyncHandler(async(req, res) => {
    const name = req.body.name; 
    const category = await CategoryModel.create({ // create a new category document in the database using the CategoryModel schema and the data provided in the request body
        name:name,
        slug: slugify(name)
    })

    res.status(201).json({data:category}) // send the newly created category document as a response
})