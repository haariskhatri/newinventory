const { string } = require('hardhat/internal/core/params/argumentTypes');
const mongoose = require('mongoose');
const locationModel = require('./Schemas');

mongoose.connect("mongodb+srv://root:Haaris8785@cluster0.walzl.mongodb.net/test");




async function addLocation(
    Name,
    Address
) {
    locationModel({
        location: Name,
        address: Address
    }).save();
}

async function getAllLocations() {
    const locations = await locationModel.find();
    return locations;
}

async function getLocation(address) {
    const location = await locationModel.findOne({ address: address });
    return location;
}


module.exports = { addLocation, getAllLocations, getLocation }