const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    setup: {type: Boolean, required: false, default: false}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema, 'users');
