const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalyticsHistory } = require('../controllers/url');
const url = require('../models/url');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalyticsHistory);

module.exports = router;