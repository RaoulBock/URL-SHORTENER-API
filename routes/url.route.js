const ms = require('ms'); // import at top
const express = require("express");
const router = express.Router();
const Url = require("../models/url.model");
const { nanoid } = require("nanoid");

// POST - create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, expiresIn = '7d' } = req.body; // default: 7 days

  if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

  let durationMs = ms(expiresIn); // parse string like '5m', '2h', '3d'
  if (!durationMs) return res.status(400).json({ error: 'Invalid expiry format (use 5m, 2h, 3d, etc.)' });

  const shortId = nanoid(6);
  const expiresAt = new Date(Date.now() + durationMs); // set expiry date

  try {
    const newUrl = new Url({ originalUrl, shortId, expiresAt });
    await newUrl.save();
    res.json({
      shortUrl: `${req.protocol}://${req.get('host')}/${shortId}`,
      expiresAt
    });
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
