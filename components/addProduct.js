const ethers = require('ethers');
const NodeRSA = require('node-rsa');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('60c3d4f81196f4e4e0e1', '3a5cc8dc97edfde36f99dee30bba53657b07fe603dd29d1613c69e9cd8bb36fe');


const key = '084b6dfbf06f8127f3ad4fe06c9d08367ffcb108061b2d8769a0aec8aaf12a1f'

const provider = new ethers.providers.InfuraProvider("sepolia", "f6f192f81294461f873a6243cfccad29");
const signer = new ethers.Wallet(key, provider);
const contractabi = require('../artifacts/contracts/product.sol/Warehouse.json');
const contract = new ethers.Contract("0x337eA2042cA27876291D963fe93feA5c4CA6415a", contractabi.abi, signer);

const { locationModel, productModel } = require('./Schemas');

async function addNewProduct(
    productName,
    productID,
    manufacturingdate,
    batchNumber,
    quantity,
    expiry,
    supplier,
    amount
) {

    const key = new NodeRSA();
    key.importKey(process.env.PUBLIC_KEY, 'pkcs8-public-pem');

    // productName = req.body.productName;
    // productID = "";
    // quantity = req.body.quantity;
    // manufacturingdate = req.body.manufacturingdate;
    // batchNumber = req.body.batchNumber;
    // expiry = req.body.expiry;
    // supplier = req.body.supplier;
    // amount = req.body.amount;

    const body = {
        "name": productName,
        "id": productID,
        "quantity": quantity,
        "batchNumber": batchNumber,
        "manufacturingdate": manufacturingdate,
        "expiry": expiry,
        "supplier": supplier
    }
    const finalamount = amount;
    const data = {
        "meta": key.encrypt(JSON.stringify(body), 'base64')
    }


    pinata.pinJSONToIPFS(data).then(async (result) => {
        //handle results here
        const uri = `https://ipfs.io/ipfs/${result}`;
        console.log(uri);
        setTimeout(async () => {
            const tx = await contract.AddProducts(
                [2],
                [10],
                ["https://ipfs.io/ipfs/QmWXhYwpXCnRWtXp3KPSdz8svLSjD6LJ7NM9fFyrNCsR1A"]
            );

            const receipt = await tx.wait();
            productModel({
                productName,
                productID,
                manufacturingdate,
                batchNumber,
                quantity,
                expiry,
                supplier
            }).save();


        }, 5 * 1000);
    })

}

module.exports = {
    addNewProduct,
    ethers,
    NodeRSA,
    pinataSDK,
    pinata,
    key,
    provider,
    signer,
    contractabi,
    contract
}