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
        let admin;
        for (const el of users) {
                const user = await User.create(el);
                console.log("Created user", user);
                if (el.name === 'Admin User') {
                    admin = user
                }
            }
            console.log("Populated users.");
            populateProdcuts(admin)
    } catch (err) {
        console.log("Error when populating users:", err)
    }

}

async function populateProdcuts(admin) {
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
    const products = await Product.find()
    const users = await User.find()

    for (let i = 0, j = 0; reviews.length; i++, j++) {
        if (i === users.length) { i = 0};
        if (j === products.length) { j = 0};
        if (users[i].name === 'Admin User') { 
            j--;
            continue;
        };

        try {
            const review = await Review.create({...reviews.pop(), name: users[i].name, user: users[i]._id})
            await products[j].reviews.push(review)
            await products[j].save()
            console.log(`User ${i} posts review to product${j}.`)
        } catch (err) {
            console.log("Error while adding a review to proudcts:", err)
        }
    }

    console.log("Reviews finished.")
}



// const allUsers = await User.find()
// console.log('allUsers', allUsers)
// const allProducts = await Product.find()
// console.log('allProducts', allProducts)
