import asyncHandler from '../middleware/asyncHandler.js';
import { productModel } from '../models/productModel.js'


// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res, next) => {
    const products = await productModel.find()
    return res.json(products)
})

// @desc      Fetch a single product by id
// @route     GET /api/product/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (product) { return res.json(product) }
    return res.status(404).json({status: 404, message: "Product not found."})
})

export { getProducts, getProductById }