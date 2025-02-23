const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    setup: {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false},
    verifyCode: {type: Number},
    codeExpires: {type: Date},
    resendCount: {type: Number, default: 0},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema, 'users');
