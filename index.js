const express = require('express');
const urlRoute = require('./routes/url');
const { handleGetRedirectUrlFromShortId } = require('./controllers/url');

const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8001;
const { connectionStr } = require('./env');

const urlDbName = 'url-shortener-node';
connectToMongoDB(connectionStr + '/' + urlDbName).then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', handleGetRedirectUrlFromShortId);

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });


