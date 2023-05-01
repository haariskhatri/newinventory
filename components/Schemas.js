const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productID: {
        type: Number,
        required: true
    },
    manufacturingdate: {
        type: Date,
        required: true
    },
    batchNumber: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    supplier: {
        type: String,
        required: true
    }
})

const productModel = mongoose.model('products', productSchema);
const locationModel = mongoose.model('locations', locationSchema);

module.exports = { locationModel, productModel }