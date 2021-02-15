const asyncHandler = require('express-async-handler');
const Product = require('../Model/ProductsModel')


const getProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({});
    // res.status(401);                      // frontend error display
    // throw new Error('NOT AUTHORIZED')
    res.send(product);
});

const getProduct = asyncHandler(async (req, res) => {
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
});

module.exports = {getProduct, getProducts}