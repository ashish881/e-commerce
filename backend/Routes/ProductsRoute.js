const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../Model/ProductsModel')
const router = express();

// Fetch All Products
// Public Access

router.get('/', asyncHandler(async (req, res) => {
    const product = await Product.find({});
    // res.status(401);                      // frontend error display
    // throw new Error('NOT AUTHORIZED')
    res.send(product);
}));

//Fetch Single Products
//Public Access

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)
    }else{
        // res.status(404).json({
        //     Message:'Product Not Found'
        // })
        res.status(404); // If we dont pass 404 it gives 500 internal error which set in middleware
        throw new Error ('Product Not Found');
    }
}))

module.exports = router;