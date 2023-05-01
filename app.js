const ethers = require('ethers');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
mongoose.connect("mongodb+srv://root:Haaris8785@cluster0.walzl.mongodb.net/test");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json())

const readData = require('./components/readdata');
const addProduct = require('./components/addProduct');
const { addLocation, getLocation, getAllLocations } = require('./components/location');
const { getManager } = require('./components/connect');
const product = require('./components/addProduct');


app.get('/alllocations', async (req, res) => {
    const locations = await getAllLocations();
    res.json({
        data: locations
    })
})

app.get('/getlocation', async (req, res) => {
    const result = await getLocation(req.body.address);
    const location = result.location
    res.json({
        result: location
    })
})

app.post('/addproduct', async (req, res) => {


    // const productName = req.body.productName;
    // const manufacturingdate = req.body.manufacturingdate;
    // const batchNumber = req.body.batchNumber;
    // const quantity = req.body.quantity;
    // const expiry = req.body.expiry;
    // const supplier = req.body.supplier;
    // const amount = req.body.amount;

    await product.addNewProduct(
        "Book",
        12,
        "2023-03-04",
        123,
        10,
        "2023-04-05",
        "Haaris",
        10
    );

})

//Generate Keys
// const key = new NodeRSA({ b: 512 });


// console.log("Public \n")
// console.log(key.exportKey('pkcs8-public-pem'))

// console.log("Private")
// console.log(key.exportKey('pkcs1-pem'))





app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})


app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-product.html'))
})

app.listen(4000, () => {
    console.log("Running");
})



