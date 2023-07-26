import express from 'express';
import { productModel } from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    const products = await productModel.find()
    return res.json(products)
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id)
    if (product) { return res.json(product) }
    return res.status(404).json({status: 404, message: "Product not found."})
}));

export default router;