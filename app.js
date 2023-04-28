const ethers = require('ethers');


const connect = async () => {

    const contractabi = require('./artifacts/contracts/product.sol/Warehouse.json');
    const key = '56fae8129c16de3f46e82e0347cf6c157c2bf6de7454f1bf46ee7d8b1b50092f'

    const provider = new ethers.providers.InfuraProvider("sepolia", "f6f192f81294461f873a6243cfccad29");
    const signer = new ethers.Wallet(key, provider);

    const contract = new ethers.Contract("0xE3b1176545E9658d36bF9EE5e059309678d27501", contractabi.abi, signer);

    console.log(await contract.manager());

}

connect();