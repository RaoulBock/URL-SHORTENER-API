const express = require("express");
const router = express.Router();
const Url = require("../models/url.model");
const { nanoid } = require("nanoid");

// POST - create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, expireInDays } = req.body;

  if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

  const shortId = nanoid(6);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + (expireInDays || 7)); // default: 7 days

  try {
    const newUrl = new Url({ originalUrl, shortId, expiresAt });
    await newUrl.save();
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`, expiresAt });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// GET - redirect to original URL
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ error: 'URL not found or expired' });
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
