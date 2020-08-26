const express = require('express');

const leaderboard = require('./leaderboard')

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/leaderboard', leaderboard);

module.exports = router;
