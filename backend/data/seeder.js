import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './users.js'
import products from './products.js'
import reviews from './reviews.js'
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

dotenv.config()
connectDB()

// populateUsers()
populateReviews()

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
        let admin;
        for (const el of users) {
                const user = await User.create(el);
                console.log("Created user", user);
                if (el.name === 'Admin User') {
                    admin = user
                }
            }
            console.log("Populated users.");
            populateProdcuts()
    } catch (err) {
        console.log("Error when populating users:", err)
    }

}

async function populateProdcuts() {
    try {
        for (const el of products) {
            const product = await Product.create({...el, user: admin._id, reviews: []})
            console.log("Created product", product);
        }
        console.log("Populated products.");
        populateReviews()
    } catch (err) {
        console.log("Error when populating products:", err)
    }
}

async function populateReviews() {
    const allUsers = await User.find()
    console.log('allUsers', allUsers)
    const allProducts = await Product.find()
    console.log('allProducts', allProducts)
    for (const el of reviews) {
        console.log(el)
    }
}