const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: false,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

categorySchema.index({ ownerId: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;