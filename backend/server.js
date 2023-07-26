import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()
connectDB()

const port = process.env.PORT || 2000;

const app = express();

app.get('/', (req, res) => {
    res.json("API connected.")
});

app.use('/api/products', productRoutes)

app.listen(port, () => {
    console.log("Server running on port", port)
})