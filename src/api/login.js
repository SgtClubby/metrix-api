const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "This is Working!!!"
    })
})

module.exports = router;
    