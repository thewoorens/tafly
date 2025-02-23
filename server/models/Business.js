const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    type: {
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
        ref: 'User',
        required: true
    },
    visitorId: {
        type: String,
        default: function () {
            return this.name.toLowerCase().replace(/ /g, '-').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
        }
    },
    settings: {type: JSON, default: {}},
}, {timestamps: true});

const Business = mongoose.model('Business', businessSchema);
module.exports = Business;