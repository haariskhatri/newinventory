const ethers = require('ethers');
const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');


const app = express();

app.use(bodyparser.urlencoded({ extended: false }));

var contract;

const connect = async () => {

    const contractabi = require('./artifacts/contracts/product.sol/Warehouse.json');
    const key = '56fae8129c16de3f46e82e0347cf6c157c2bf6de7454f1bf46ee7d8b1b50092f'

    const provider = new ethers.providers.InfuraProvider("sepolia", "f6f192f81294461f873a6243cfccad29");
    const signer = new ethers.Wallet(key, provider);

    contract = new ethers.Contract("0xE3b1176545E9658d36bF9EE5e059309678d27501", contractabi.abi, signer);

    console.log(await contract.manager());

}

connect();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-product.html'))
})

app.post('/add-product', async (req, res) => {

})

app.listen(4000, () => {
    console.log("Running");
})