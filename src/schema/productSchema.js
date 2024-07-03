const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Product Name is required"],
        minlength: [5, "Product name must be atleast 5 character"],
        trim: true
    },

    description: {
        type: String,
        required: [true, "Product description is mandatory"],
        minlength: [10, "Product description must be atleast 10 character long"],
    },

    price: {
        type: Number,
        required: [true, "Product price is mandatory"],
        min: 0.01
    },

    category: {
        type: String,
        enum: ['veg','non-veg','drinks','sides'],
        default: 'veg'
    },

    productImage: {
        type: String
    },

    inStock: {
        type: Boolean,
        required: [true, "In stock is required"],
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product" , productSchema);
module.exports = Product;

