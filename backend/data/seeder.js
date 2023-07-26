import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './users.js'
import products from './products.js'
import reviews from './reviews.js'
import {productModel as Product, reviewtModel as Review} from "../models/productModel.js";
import User from "../models/userModel.js";
import { truncate } from "fs";

dotenv.config()
connectDB()

populateUsers()


async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected:', conn.connection.name)
    } catch (err) {
        console.log('MongoDB not connected. Error:', err)
    }
}

async function populateUsers() {
    try {
        await User.insertMany(users)
        console.log("Populated users.");
        populateProdcuts()
    } catch (err) {
        console.log("Error when populating users:", err)
    }

}

async function populateProdcuts() {
    try {
        const admin = await User.findOne({name: 'Admin User'})
        const sampleProducts = products.map(product => ({...product, user: admin._id, reviews: []}))
        await Product.insertMany(sampleProducts)
        console.log("Populated products.");
        populateReviews()
    } catch (err) {
        console.log("Error when populating products:", err)
    }
}

async function populateReviews() {
    const products = await Product.find()
    const users = await User.find()
    const promises = []
    for (let userIndex = 0, productIndex = 0; reviews.length > 0; userIndex++, productIndex++) {
        if (userIndex === users.length) { userIndex = 0};
        if (productIndex === products.length) { productIndex = 0};

        const user = users[userIndex]
        const product = products[productIndex]


        if (user.name === 'Admin User') { 
            productIndex--;
            continue;
        };


        const reviewData = {...reviews.pop(), name: user.name, user: user._id}
        const review = await Review.create(reviewData)
        await product.reviews.push(review);
        await product.save();
    }

    console.log("Reviews finished.");
}