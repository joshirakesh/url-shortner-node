const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: number } }]
}, { timestamps: true });

const url = mongoose.model('Url', Schema);

module.exports = url;