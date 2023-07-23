const express = require('express');
const urlRoute = require('./routes/url');
const { handleGetRedirectUrlFromShortId } = require('./controllers/url');

const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener-node').then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', handleGetRedirectUrlFromShortId);

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });


