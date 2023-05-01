const NodeRSA = require('node-rsa');
const axios = require('axios');

async function readData(url) {
    const key = new NodeRSA();
    key.importKey(process.env.PRIVATE_KEY, 'pkcs1-pem');
    //const data = await axios.get(`https://ipfs.io/ipfs/QmWXhYwpXCnRWtXp3KPSdz8svLSjD6LJ7NM9fFyrNCsR1A`);
    const data = await axios.get(`https://ipfs.io/ipfs/${url}`);
    const newdata = data.data.meta;
    const result = key.decrypt(newdata, 'utf8');
    console.log(result)
}

module.exports = readData;