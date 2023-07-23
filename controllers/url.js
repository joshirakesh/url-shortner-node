const { generate } = require('shortid');
const Url = require('../models/url');
const url = require('../models/url');

async function handleGenerateNewShortURL(req, res) {

    const body = req.body;

    if (!body.url) return res.status(400).json({ message: 'URL is required' });

    const shortId = generate();

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