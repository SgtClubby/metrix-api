const express = require('express');

const leaderboard = require('./leaderboard');
const user = require("../routes/user"); 

const InitiateMongoServer = require("../config/db");

InitiateMongoServer();

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/leaderboard', leaderboard);
router.use('/user', user);

module.exports = router;
