const router = require('express').Router();
const axios = require('axios');
const Search = require('./models/Search');
const { ensureLoggedIn } = require('connect-ensure-login');

// POST /api/search
router.post('/search', ensureLoggedIn('/auth/google'), async (req, res) => {
  const { term } = req.body;
  // record search
  await Search.create({ user: req.user._id, term });
  // fetch images
  const resp = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query: term, per_page: 20 },
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
  });
  res.send(resp.data.results);
});

// GET /api/history
router.get('/history', ensureLoggedIn('/auth/google'), async (req, res) => {
  const hist = await Search.find({ user: req.user._id })
    .sort({ timestamp: -1 })
    .limit(20);
  res.send(hist);
});

// GET /api/top-searches
router.get('/top-searches', ensureLoggedIn('/auth/google'), async (req, res) => {
  const agg = await Search.aggregate([
    { $group: { _id: '$term', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.send(agg.map(x => ({ term: x._id, count: x.count })));
});

module.exports = router;
