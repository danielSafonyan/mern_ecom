import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    orderItems: [
        {
            name: { type: String, required: true},
            qty: { type: Number, required: true},
            image: { type: String, required: true},
            price: { type: Number, required: true},
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true}
        }
    ],
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentResult: {
        id: { type: String, required: true },
        status: { type: String, required: true },
        update_time: { type: String, required: true },
        email_address: { type: String, required: true },
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Boolean, default: false },
},
{
    timestamps: true
})

const orderModel = mongoose.model("Order", orderSchema)