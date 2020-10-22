const express = require('express');

const leaderboard = require('./leaderboard');
const user = require("../routes/user"); 
const fortiap = require("./fortiap")
const get_aps = require("./get_aps")

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
router.use('/fortiap', fortiap);
router.use('/get_aps', get_aps);

module.exports = router;
