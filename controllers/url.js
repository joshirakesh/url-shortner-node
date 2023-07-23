const shortid = require('shortid');
const url = require('../models/url');

async function handleGenerateNewShortURL(req, res) {

    const body = req.body;

    if (!body.url) return res.status(400).json({ message: 'URL is required' });

    const shortId = shortid();

    await url.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.status(201).json({ shortId });

}


module.exports = {
    handleGenerateNewShortURL
};