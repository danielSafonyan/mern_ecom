import express from 'express';
import dotenv from 'dotenv'
import products from './data/products.js';
import cors from 'cors'
dotenv.config()

const port = process.env.PORT || 2000;

const app = express();

// app.use(cors())

app.get('/', (req, res) => {
    res.json("API connected.")
});

app.get('/api/products', (req, res) => {
    res.json(products)
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(el => el._id === Number(req.params.id))
    res.json(product)
});


app.listen(port, () => {
    console.log("Server running on port", port)
})