const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    try {
        console.log('Connecting to MongoDB');
        return await mongoose.connect(url);
    }
    catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    }
}

module.exports = {
    connectToMongoDB
}