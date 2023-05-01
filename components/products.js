
const ethers = require('ethers');


const contractabi = require('../artifacts/contracts/product.sol/Warehouse.json');
const key = '084b6dfbf06f8127f3ad4fe06c9d08367ffcb108061b2d8769a0aec8aaf12a1f'

const provider = new ethers.providers.InfuraProvider("sepolia", "f6f192f81294461f873a6243cfccad29");
const signer = new ethers.Wallet(key, provider);

const contract = new ethers.Contract("0x8A1AF72f4258E86D33a9Df3aaB1b71D207f6f569", contractabi.abi, signer);


