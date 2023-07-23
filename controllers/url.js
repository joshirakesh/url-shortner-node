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

async function handleGetRedirectUrlFromShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await url.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    }, { new: true });
    let redirectUrl = entry?.redirectUrl;
    if (!/^https?:\/\//i.test(redirectUrl)) {
        console.log('addding http');
        redirectUrl = 'https://' + redirectUrl;
    }
    console.log('redirecting to', redirectUrl);
    res.redirect(redirectUrl);
}

async function handleGetAnalyticsHistory(req, res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({ shortId });
    return res.status(200).json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetRedirectUrlFromShortId,
    handleGetAnalyticsHistory
};