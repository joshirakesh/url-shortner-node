const express = require('express');
const urlRoute = require('./routes/url');
const url = require('./models/url');
const { connectToMongoDB } = require('./connect');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener-node').then(() => {
    console.log('Connected to MongoDB');
});

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }, { new: true });
    res.redirect(entry?.redirectUrl);
});

app.listen(PORT, () => { console.log(`Server is running on port: ${PORT}`) });


