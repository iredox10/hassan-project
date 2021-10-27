const mongoose = require('mongoose')

const regSchema =new mongoose.Schema({
    vcOwner: {
        type: String,
        required: true
    },
    driverLicense: {
        type: String,
        required: true
    },
    placeIssue: {
        type: String,
        required: true
    },
    stateOfReg: {
        type: String,
        required: true
    },
    vcChasisNumber: {
        type: String,
        required: true
    },
    engineNumber: {
        type: String,
        required: true
    },
    vcType: {
        type: String,
        required: true
    },
    vcCapacity: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    insurer: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    plateNumber:{
        type:String,
        unique: true
    },
    licenseExpiration : String,
    password:{
        type:String,
        required: true
    },
})


const regModel =  mongoose.model('regModel', regSchema) 
module.exports = regModel