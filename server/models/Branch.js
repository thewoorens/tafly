const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    social: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    logo: {
        type: String,
        required: false
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;